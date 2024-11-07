import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/api/products/:id', ({ params }) => {
    const id = (params['id'] as unknown as string) || '';
    return HttpResponse.json({
      id,
      description: 'Beer',
      price: '7.89',
      cost: 2.98,
      reviews: ['Best Beer Ever - George', 'Good with Tacos - Jeff'],
    });
  }),
];

export default handlers;
