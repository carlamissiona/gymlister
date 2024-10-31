const dummyData = {
  students: [
    {
      id: 1,
      username: 'student1',
      password: 'password123',
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      aboutMe: 'Fitness enthusiast',
      type: 'student'
    }
  ],
  instructors: [
    {
      id: 1,
      username: 'instructor1',
      password: 'password123',
      fullName: 'Jane Smith',
      address: '456 Gym Ave',
      city: 'Los Angeles',
      aboutMe: 'Certified trainer with 5 years experience',
      type: 'instructor'
    }
  ],
  gyms: [
    {
      id: 1,
      name: 'PowerFit Gym',
      city: 'New York',
      description: 'Full-service fitness center',
      capacity: 100,
      amenities: 'Pool, Sauna, Weight Room',
      address: '789 Fitness Blvd',
      fee: 50,
      operatingHours: '6:00 AM - 10:00 PM',
      instructorId: 1
    }
  ]
};

module.exports = dummyData;