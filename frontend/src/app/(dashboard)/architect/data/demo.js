

export const mockProjects = [
  {
    id: '1',
    title: 'Modern Villa Design',
    description: 'A stunning 4-bedroom modern villa with minimalist design and sustainable features.',
    type: 'Residential',
    budget: 250000,
    location: 'Beverly Hills, CA',
    year: 2024,
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'completed',
    clientName: 'John Smith',
    clientEmail: 'john.smith@email.com',
    completedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Office Complex Renovation',
    description: 'Complete renovation of a 5-story office building with modern amenities.',
    type: 'Commercial',
    budget: 750000,
    location: 'Manhattan, NY',
    year: 2024,
    images: [
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'ongoing',
    clientName: 'Tech Corp Inc.',
    clientEmail: 'projects@techcorp.com',
    startDate: '2024-01-01',
    deadline: '2024-06-30'
  },
  {
    id: '3',
    title: 'Luxury Apartment Interior',
    description: 'High-end interior design for a penthouse apartment with panoramic city views.',
    type: 'Interior',
    budget: 150000,
    location: 'Miami, FL',
    year: 2023,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'completed',
    clientName: 'Maria Garcia',
    clientEmail: 'maria.garcia@email.com',
    completedDate: '2023-12-20'
  }
];

export const mockProjectRequests = [
  {
    id: '1',
    clientName: 'Robert Wilson',
    clientEmail: 'robert.wilson@email.com',
    clientPhone: '+1 (555) 987-6543',
    projectType: 'Residential',
    description: 'Looking for a modern family home design with 3 bedrooms and a home office.',
    budget: 180000,
    deadline: '2024-08-15',
    status: 'pending',
    submittedDate: '2024-01-20'
  },
  {
    id: '2',
    clientName: 'Emma Thompson',
    clientEmail: 'emma.thompson@email.com',
    clientPhone: '+1 (555) 456-7890',
    projectType: 'Interior',
    description: 'Restaurant interior design with a cozy, rustic theme for 50 seats.',
    budget: 80000,
    deadline: '2024-07-01',
    status: 'pending',
    submittedDate: '2024-01-18'
  }
];

export const mockFeedbacks = [
  {
    id: '1',
    clientName: 'John Smith',
    projectId: '1',
    projectTitle: 'Modern Villa Design',
    rating: 5,
    review: 'Sarah exceeded our expectations! The design was innovative and the project was completed on time. Highly recommended!',
    date: '2024-01-20'
  },
  {
    id: '2',
    clientName: 'Maria Garcia',
    projectId: '3',
    projectTitle: 'Luxury Apartment Interior',
    rating: 5,
    review: 'Absolutely stunning work! The attention to detail and creativity made our apartment feel like a luxury hotel.',
    date: '2023-12-25'
  },
  {
    id: '3',
    clientName: 'David Lee',
    projectId: '4',
    projectTitle: 'Office Renovation',
    rating: 4,
    review: 'Great communication and professional service. The design improved our workspace significantly.',
    date: '2023-11-15'
  }
];

export const mockMessages = [
  {
    id: '1',
    senderId: 'client1',
    senderName: 'Robert Wilson',
    content: 'Hi Sarah, I wanted to discuss the timeline for the residential project. Can we schedule a call?',
    timestamp: '2024-01-20T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    senderId: 'client2',
    senderName: 'Tech Corp Inc.',
    content: 'The progress on the office renovation looks great! When will the next milestone be completed?',
    timestamp: '2024-01-19T14:15:00Z',
    isRead: true
  }
];

export const mockAnalytics = {
  profileViews: 1240,
  totalProjects: 15,
  ongoingProjects: 3,
  completedProjects: 12,
  totalEarnings: 1250000,
  clientInteractions: 89,
  mostLikedProject: 'Modern Villa Design'
};
