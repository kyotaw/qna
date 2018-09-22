'use strict';


class CsvStream {

    constructor(fileStream, outputType='array') {
        this.fileStream = fileStream;
        this.outputType = outputType;
        this.handlers = {};
        this.rowFragment = '';
        this.header = null;
        this.prevRow = null;
    }

    onHeader(handler) {
        this.handlers['header'] = handler;
    }

    onRow(handler) {
        this.handlers['row'] = handler;
    }

    onEnd(handler) {
        this.handlers['end'] = handler;
    }

    start() {
        let self = this;
        this.fileStream.on('data', (chunk) => { self._parseBuffer(chunk); });
        this.fileStream.on('end', () => {
            self._parseRow(self.rowFragment);
            if (self.handlers['end']) {
                self.handlers['end']();
            }
        });
    }

    close() {
        this.resume();
        this.fileStream.destroy();
    }

    pause() {
        if (!this.fileStream.isPaused()) {
            this.fileStream.pause();
        }
    }

    resume() {
        if (this.fileStream.isPaused()) {
            this.fileStream.resue();
        }
    }

    _parseBuffer(buffer) {
        const chunk = buffer.toString('utf-8', 0, buffer.length);
        if (!chunk) {
            return;
        }
        let rows = chunk.split('\n');
        if (this.rowFragment !== '') {
            this.rowFragment += rows[0];
            if (rows.length > 1 || chunk[chunk.length - 1] === '\n') {
                this._parseRow(this.rowFragment);
                this.rowFragment = '';
            }
            rows.shift();
        }
        
        if (rows.length === 0) {
            return;
        }

        for (let i = 0; i < rows.length - 1; ++i) {
            this._parseRow(rows[i]);
        }

        const lastRow = rows[rows.length - 1];
        if (chunk[chunk.length - 1] === '\n') {
            this._parseRow(lastRow);
        } else {
            this.rowFragment = lastRow;
        }
    }

    _parseRow(row) {
        const tokens = row.replace(new RegExp('"', 'g'), '').split(',');
        if (this.prevRow === null) {
            this.prevRow = tokens;
            return;
        }
        if (this.header === null) {
            if (this.prevRow.length === tokens.length) {
                this.header = this.prevRow;
                if (this.handlers['header']) {
                    this.handlers['header'](this.header);
                }
            } else {
                this.prevRow = tokens;
                return;
            }
        }
        if (tokens.length !== this.header.length) {
            this.prevRow = tokens;
            return;
        }

        let data = tokens;
        if (this.outputType === 'dict') {
            data = {};
            for (let i = 0; i < this.header.length; ++i) {
                data[this.header[i]]= tokens[i];
            }
        }
        if (this.handlers['row']) {
            this.handlers['row'](data);
        }
        this.prevRow = tokens;
    }
}


module.exports.CsvStream = CsvStream;
