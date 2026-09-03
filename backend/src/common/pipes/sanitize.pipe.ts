import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    if (metadata.type !== 'body' && metadata.type !== 'query' && metadata.type !== 'param') {
      return value;
    }

    return this.sanitize(value);
  }

  private sanitize(value: unknown, key?: string): unknown {
    if (typeof value === 'string') {
      return key?.toLowerCase().includes('password') ? value : value.trim();
    }
    if (Array.isArray(value)) {
      return value.map((item) => this.sanitize(item));
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([entryKey, entryValue]) => [
          entryKey,
          this.sanitize(entryValue, entryKey),
        ]),
      );
    }
    return value;
  }
}
