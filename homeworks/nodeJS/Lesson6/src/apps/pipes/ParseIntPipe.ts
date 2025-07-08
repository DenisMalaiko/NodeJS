export class ParseIntPipe {
  transform(value: any) {
    console.log("[ PIPE ] ", value)

    if (typeof value !== 'string') {
      throw new Error(`Validation failed: expected string, got ${typeof value}`);
    }

    return value;
  }
}