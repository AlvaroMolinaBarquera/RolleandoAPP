export const enviroment = {
  node: {
    server: 'localhost',
    port: '3333',
  },
  traces: {
    rest: '/traces',
    traceLevel: 3, // Indica a partir de que nivel se mostran las trazas
    console: true, // Indica si las trazas salen por consola.
  },
  transaction: {
    rest: '/transaction'
  }
};