export const parseArgs = (argv: any) => {
  const args: any = { command: argv[2] };

  for (let i = 3; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const value = argv[i + 1];
      args[key] = value;
      i++;
    }
  }

  return args;
}

/*
export const generateId = () => {
  return Math.random().toString(36).substring(2, 8);
}*/
