// import request from 'supertest';
// import app from '../app';
// import prisma from '../config/prisma';

// describe('Time Tracking Controller', () => {
//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   test('should create a time tracking entry', async () => {
//     const response = await request(app)
//       .post('/api/timeTracking')
//       .send({
//         userId: 1,
//         date: '2023-10-10',
//         hoursWorked: 8,
//         status: 'Completed',
//       });
//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe('Time tracking entry created successfully.');
//   });

//   test('should retrieve all time tracking entries', async () => {
//     const response = await request(app).get('/api/timeTracking');
//     expect(response.status).toBe(200);
//     expect(response.body.timeTrackings).toBeDefined();
//   });

//   test('should retrieve a time tracking entry by ID', async () => {
//     const trackingId = 1; // Remplacez par un ID valide
//     const response = await request(app).get(`/api/timeTracking/${trackingId}`);
//     expect(response.status).toBe(200);
//     expect(response.body.timeTracking).toBeDefined();
//   });
// });
