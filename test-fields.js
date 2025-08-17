// Simple test file to verify field module functionality
// Run this after starting your server to test the endpoints

const testFieldData = {
  name: "Test Football Field",
  description: "A test field for development and testing purposes",
  location: "Test Location, Cairo",
  size: "5-a-side",
  surface: "Artificial Grass",
  pricePerHour: 100,
  amenities: ["Lighting", "Parking"],
  maxPlayers: 10,
  openingHours: {
    open: "06:00",
    close: "22:00"
  }
};

console.log('🧪 Field Module Test Data:');
console.log('==========================');
console.log(JSON.stringify(testFieldData, null, 2));
console.log('\n📋 Test Commands:');
console.log('==================');
console.log('1. Start your server: npm run dev');
console.log('2. Test health check: curl http://localhost:5000/health');
console.log('3. Test create field: curl -X POST http://localhost:5000/api/fields -H "Content-Type: application/json" -d \'<field_data>\'');
console.log('4. Test get all fields: curl http://localhost:5000/api/fields');
console.log('5. Test get field by location: curl http://localhost:5000/api/fields/location/Test%20Location');
console.log('6. Test get field by size: curl http://localhost:5000/api/fields/size/5-a-side');
console.log('\n💡 Tips:');
console.log('=========');
console.log('- Use Postman or similar tool for easier testing');
console.log('- Check the console for server logs');
console.log('- Verify MongoDB connection in console output');
console.log('- Test validation by sending invalid data');
