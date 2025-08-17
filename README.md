# Football Field Booking Backend - Field Module

This is the **Field Module** of the Football Field Booking System, responsible for managing football fields, their availability, and related operations.

## 🏗️ Project Structure

```
football-booking-backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   └── field.controller.js   # Field business logic
├── middlewares/
│   └── validationSchema.js   # Data validation rules
├── models/
│   └── Field.js             # Field database schema
├── routes/
│   └── field.routes.js      # Field API endpoints
├── index.js                 # Main application file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Verify the server is running:**
   - Health check: `http://localhost:5000/health`
   - Fields API: `http://localhost:5000/api/fields`

## 📊 Field Model Schema

The Field model includes the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | String | ✅ | Field name (2-100 chars) |
| `description` | String | ✅ | Field description (10-500 chars) |
| `location` | String | ✅ | Field location (3-200 chars) |
| `size` | String | ✅ | Field size (5-a-side, 7-a-side, 11-a-side, Training) |
| `surface` | String | ✅ | Surface type (Grass, Artificial Grass, Turf, Indoor) |
| `pricePerHour` | Number | ✅ | Price per hour (positive number) |
| `amenities` | Array | ❌ | Available amenities |
| `images` | Array | ❌ | Field images URLs |
| `isAvailable` | Boolean | ❌ | Field availability status |
| `maintenanceMode` | Boolean | ❌ | Maintenance mode status |
| `openingHours` | Object | ❌ | Opening and closing times |
| `maxPlayers` | Number | ✅ | Maximum players capacity |

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/fields` | Get all fields with filtering and pagination |
| `GET` | `/api/fields/:id` | Get field by ID |
| `GET` | `/api/fields/location/:location` | Get fields by location |
| `GET` | `/api/fields/size/:size` | Get fields by size |

### Admin Endpoints (Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/fields` | Create new field |
| `PUT` | `/api/fields/:id` | Update field |
| `DELETE` | `/api/fields/:id` | Delete field |
| `PATCH` | `/api/fields/:id/toggle-availability` | Toggle field availability |
| `PATCH` | `/api/fields/:id/toggle-maintenance` | Toggle maintenance mode |

## 📝 API Usage Examples

### Get All Fields
```bash
GET /api/fields?size=5-a-side&location=Cairo&page=1&limit=10
```

### Create a New Field
```bash
POST /api/fields
Content-Type: application/json

{
  "name": "Premium 5-a-side Field",
  "description": "High-quality artificial grass field with lighting",
  "location": "Maadi, Cairo",
  "size": "5-a-side",
  "surface": "Artificial Grass",
  "pricePerHour": 150,
  "amenities": ["Lighting", "Parking", "Changing Rooms"],
  "maxPlayers": 10,
  "openingHours": {
    "open": "06:00",
    "close": "22:00"
  }
}
```

### Filter Fields by Location
```bash
GET /api/fields/location/Maadi
```

## 🔍 Query Parameters

### Get All Fields
- `size`: Filter by field size
- `surface`: Filter by surface type
- `location`: Filter by location (case-insensitive)
- `available`: Filter by availability (true/false)
- `page`: Page number for pagination
- `limit`: Number of items per page

## ✅ Validation Rules

The API includes comprehensive validation for:
- Field name length (2-100 characters)
- Description length (10-500 characters)
- Location length (3-200 characters)
- Valid field sizes and surface types
- Positive price values
- Valid amenity types
- Time format validation (HH:MM)
- Maximum players validation

## 🚧 Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation message",
      "value": "invalidValue"
    }
  ]
}
```

## 🔐 Security Features

- Input validation and sanitization
- CORS enabled for frontend integration
- Environment variable configuration
- Error message sanitization in production

## 🧪 Testing

Test the API endpoints using tools like:
- Postman
- Insomnia
- cURL
- Frontend application

## 🤝 Integration with Team

### What You've Completed (Field Module):
✅ **Field Model** - Complete database schema  
✅ **Field Controller** - All CRUD operations  
✅ **Field Routes** - API endpoints  
✅ **Validation** - Input validation middleware  
✅ **Database Config** - MongoDB connection  
✅ **Main App** - Express server setup  

### What Your Team Needs to Complete:

#### 🔴 **Authentication Module** (Red Section):
- User registration and login
- JWT token management
- Password hashing
- User model and controller
- Auth middleware for protecting routes

#### 🟢 **Booking Module** (Green Section):
- Booking creation and management
- Time slot validation
- Conflict checking
- Booking status management
- Integration with fields and users

#### ⚫ **Admin Module** (Black Section):
- Admin user management
- Admin-specific operations
- Role-based access control

## 📋 Next Steps for Your Team

1. **Coordinate with Authentication Team:**
   - Ensure your field routes are protected with auth middleware
   - Test admin-only endpoints with proper authentication

2. **Coordinate with Booking Team:**
   - Verify field availability logic works with booking system
   - Test field status updates affect booking availability

3. **Integration Testing:**
   - Test field creation with admin authentication
   - Test field updates and deletions
   - Verify field availability affects booking system

4. **Frontend Integration:**
   - Provide API documentation to frontend team
   - Test all endpoints with frontend forms
   - Ensure proper error handling

## 🎯 Your Responsibilities

As the **Field Module** developer, you are responsible for:
- ✅ **Field Management**: CRUD operations for football fields
- ✅ **Field Status**: Availability and maintenance mode management
- ✅ **Field Information**: Complete field details and amenities
- ✅ **API Endpoints**: All field-related REST endpoints
- ✅ **Data Validation**: Input validation and error handling
- ✅ **Database Schema**: Field model and relationships

## 🚀 Deployment

1. **Environment Setup:**
   - Set production environment variables
   - Configure production database
   - Set up proper logging

2. **Security:**
   - Enable authentication middleware
   - Set up proper CORS for production
   - Configure rate limiting

3. **Monitoring:**
   - Set up health checks
   - Monitor API performance
   - Log errors and requests

## 📞 Support

If you need help with your field module or have questions about integration:
- Review the validation rules
- Check the error handling
- Test all endpoints thoroughly
- Coordinate with your team members

---

**Good luck with your football booking system! ⚽**
