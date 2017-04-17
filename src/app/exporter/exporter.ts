import { Injectable } from '@angular/core';
import { DataItem } from '../store/data/data-item.model';

export class CsvExporter {
  public static export(data: DataItem[]) {
    const csvData = this.convertToCsv(data);
    this.download(csvData);
  }

  private static convertToCsv(data: DataItem[]): string[][] {
    const csvArray = new Array<string[]>();
    csvArray.push(['x', 'y']);

    data.forEach(i => {
      csvArray.push([i.x, i.y]);
    });

    return csvArray;
  }

  private static download(csvData: string[][]): void {
    let csvString = '';
    csvData.forEach(i => csvString += i.join(';') + '\r\n');

    const blob = new Blob([csvString], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}
