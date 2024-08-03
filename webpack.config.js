const path = require('path');

module.exports = {
  entry: './src/index.js', // Punto de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
    filename: 'bundle.js', // Archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // Aplicar transformaciones a archivos .js y .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Transpilar ES6 y JSX
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolución de extensiones
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // Directorio de archivos estáticos
    compress: true,
    port: 3000, // Puerto para el servidor de desarrollo
  },
};
