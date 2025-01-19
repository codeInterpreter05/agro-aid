module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/crops',
          destination: 'http://localhost:3000/api/crops',
        },
        {
            source: '/api/cattle',
            destination: 'http://localhost:3000/api/cattle',
        },
        {
            source: '/api/chatbot',
            destination: 'http://localhost:3000/api/chatbot',
        }
      ];
    },
  };
  