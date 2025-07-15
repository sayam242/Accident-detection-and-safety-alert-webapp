const sampleReports = [
  {
    name: "Rajesh Kumar",
    contact: 9815612345,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.7746, 30.7410] },
    image: "https://images.unsplash.com/photo-1560364589-4f7fff7c4f88?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Simran Kaur",
    contact: 9815029876,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.7737, 30.7049] },
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Gurpreet Singh",
    contact: 9876543210,
    severity: "Low",
    location: { type: "Point", coordinates: [76.8010, 30.6960] },
    image: "https://images.unsplash.com/photo-1559119314-a06b32a7e9ea?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Cancelled"
  },
  {
    name: "Anita Sharma",
    contact: 9888876543,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.8203, 30.7195] },
    image: "https://images.unsplash.com/photo-1603386329225-868f37bbb241?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Deepak Malhotra",
    contact: 9915421133,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.7221, 30.7066] },
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Nisha Thakur",
    contact: 9872119988,
    severity: "Low",
    location: { type: "Point", coordinates: [76.7636, 30.7619] },
    image: "https://images.unsplash.com/photo-1586917380139-ac2995e17c9e?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Cancelled"
  },
  {
    name: "Karan Verma",
    contact: 9023456781,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.8607, 30.6905] },
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Priya Bansal",
    contact: 9044432211,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.8177, 30.6449] },
    image: "https://images.unsplash.com/photo-1594041680982-e91f27fd02b4?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Arun Mehta",
    contact: 9988776655,
    severity: "Low",
    location: { type: "Point", coordinates: [76.7301, 30.7192] },
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Sakshi Gill",
    contact: 9915223344,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.8018, 30.7307] },
    image: "https://images.unsplash.com/photo-1551731409-43b79b1d9274?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Amit Chawla",
    contact: 9856123098,
    severity: "Low",
    location: { type: "Point", coordinates: [76.7610, 30.6789] },
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Cancelled"
  },
  {
    name: "Meena Gupta",
    contact: 9811122233,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.7481, 30.7090] },
    image: "https://images.unsplash.com/photo-1621929517644-b7b773bdb623?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Ravi Khanna",
    contact: 9898023445,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.7767, 30.7650] },
    image: "https://images.unsplash.com/photo-1605433242508-e2ba0a8c2b3d?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Jyoti Rana",
    contact: 9810022266,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.7502, 30.7285] },
    image: "https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Suresh Nayyar",
    contact: 9901122448,
    severity: "Low",
    location: { type: "Point", coordinates: [76.7223, 30.7544] },
    image: "https://images.unsplash.com/photo-1587691592099-a23fdd57fd4f?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Cancelled"
  },
  {
    name: "Komal Bhatti",
    contact: 9876012345,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.7989, 30.6941] },
    image: "https://images.unsplash.com/photo-1614899422186-6786c66c8b04?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Vikram Ahuja",
    contact: 9765432109,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.7445, 30.6978] },
    image: "https://images.unsplash.com/photo-1570752430433-6798cc5b3a94?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  },
  {
    name: "Neha Chauhan",
    contact: 9856234578,
    severity: "Low",
    location: { type: "Point", coordinates: [76.8120, 30.7255] },
    image: "https://images.unsplash.com/photo-1596040033229-f8f9c62a79b3?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Cancelled"
  },
  {
    name: "Rohit Jindal",
    contact: 9823456789,
    severity: "Moderate",
    location: { type: "Point", coordinates: [76.8333, 30.6999] },
    image: "https://images.unsplash.com/photo-1620238554650-e3b46ac78820?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Responded"
  },
  {
    name: "Preeti Saini",
    contact: 9899345678,
    severity: "Critical",
    location: { type: "Point", coordinates: [76.7655, 30.7350] },
    image: "https://images.unsplash.com/photo-1583121274602-bec3c6822a14?auto=format&fit=crop&w=800&q=60",
    timeDetected: new Date(),
    status: "Pending"
  }
];

module.exports = sampleReports;
