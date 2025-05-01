// src/data/dummyCredentials.js

const initialDummyCredentials = [
  {
    credentialData: {
      degree: "Bachelor of Science in CS",
      grade: "A",
      year: 2024,
      credits: 30,
    },
    fromInstitution: "CSUSB",
    toStudent: "student@example.com",
    studentName: "John Doe",
    txHash: "0xabc123def456",
    timestamp: new Date().toISOString(),
    blockNumber: 1,
  },
  {
    credentialData: {
      degree: "Master of Business Administration",
      grade: "B+",
      year: 2023,
      credits: 40,
    },
    fromInstitution: "Stanford University",
    toStudent: "student@example.com",
    studentName: "Emily Smith",
    txHash: "0xdef789ghi012",
    timestamp: new Date().toISOString(),
    blockNumber: 2,
  },
  {
    credentialData: {
      degree: "Ph.D. in Physics",
      grade: "A+",
      year: 2022,
      credits: 50,
    },
    fromInstitution: "MIT",
    toStudent: "student@example.com",
    studentName: "Alex Johnson",
    txHash: "0xghi345jkl678",
    timestamp: new Date().toISOString(),
    blockNumber: 3,
  },
];

export default initialDummyCredentials;

// Optional helpers
export function getDummyCredentials() {
  const saved = localStorage.getItem("dummyCredentials");
  return saved ? JSON.parse(saved) : initialDummyCredentials;
}

export function saveDummyCredentials(data) {
  localStorage.setItem("dummyCredentials", JSON.stringify(data));
}
