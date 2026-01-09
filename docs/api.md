# Meeting Room Booking API Documentation

**Base URL**: `/api/v1`

---

## **1. Rooms (จัดการห้องประชุม)**

| Method | Endpoint | Description | Query Params | Body |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/rooms/` | ดึงข้อมูลห้องทั้งหมด | `skip=0`, `limit=100`, `active_only=true` | - |
| **POST** | `/rooms/` | สร้างห้องใหม่ | - | [`RoomCreate`](#roomcreate) |
| **GET** | `/rooms/{id}` | ดึงข้อมูลห้องตาม ID | - | - |
| **PUT** | `/rooms/{id}` | แก้ไขข้อมูลห้อง | - | [`RoomUpdate`](#roomupdate) |
| **DELETE** | `/rooms/{id}` | ลบห้อง (Soft delete) | - | - |
| **GET** | `/rooms/{id}/availability` | เช็คห้องว่าง | `start_datetime`, `end_datetime` | - |
| **GET** | `/rooms/available/` | ค้นหาห้องที่ว่าง | `start_datetime`, `end_datetime`, `min_capacity` | - |
| **GET** | `/rooms/{id}/schedule` | ดูตารางห้องรายวัน | `target_date` (YYYY-MM-DD) | - |

---

## **2. Bookings (จัดการการจอง)**

| Method | Endpoint | Description | Query Params | Body |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/bookings/` | ดึงรายการจองทั้งหมด | `skip`, `limit`, `room_id`, `organizer_email`, `start_date`, `end_date`, `include_cancelled` | - |
| **POST** | `/bookings/` | สร้างการจองใหม่ | - | [`BookingCreate`](#bookingcreate) |
| **GET** | `/bookings/{id}` | ดึงข้อมูลการจองตาม ID | - | - |
| **PUT** | `/bookings/{id}` | แก้ไขการจอง | - | [`BookingUpdate`](#bookingupdate) |
| **DELETE** | `/bookings/{id}` | ยกเลิกการจอง | `reason` | - |
| **GET** | `/bookings/upcoming/` | ดูการจองล่วงหน้า | `days=7` | - |
| **GET** | `/bookings/today/` | ดูการจองวันนี้ | - | - |
| **GET** | `/bookings/my/` | ดูการจองของฉัน | `organizer_email` (required) | - |
| **GET** | `/bookings/search/` | ค้นหาการจอง | `q` (keyword) | - |

---

## **Data Models**

### <a id="roomcreate"></a>**RoomCreate (สำหรับสร้างห้อง)**
```json
{
  "name": "Meeting Room A",   // required
  "capacity": 10,             // required
  "location": "Floor 2",      // required
  "description": "Projector available",
  "start_time": "09:00:00",   // required (HH:MM:SS)
  "end_time": "18:00:00"      // required (HH:MM:SS)
}
```

### <a id="roomupdate"></a>**RoomUpdate (สำหรับแก้ไขห้อง)**
```json
{
  "name": "Updated Room Name",
  "capacity": 15,
  "location": "New Location",
  "description": "New Description",
  "start_time": "08:00:00",
  "end_time": "17:00:00",
  "is_active": true
}
```

### <a id="bookingcreate"></a>**BookingCreate (สำหรับสร้างการจอง)**
```json
{
  "room_id": 1,                     // required
  "title": "Team Weekly Sync",      // required
  "organizer_name": "John Doe",     // required
  "organizer_email": "john@example.com",
  "participant_count": 5,           // default: 1
  "start_datetime": "2024-03-20T09:00:00", // required (ISO 8601)
  "end_datetime": "2024-03-20T10:00:00",   // required (ISO 8601)
  "description": "Discuss weekly progress",
  "notes": "Prepare slides"
}
```

### <a id="bookingupdate"></a>**BookingUpdate (สำหรับแก้ไขการจอง)**
```json
{
  "title": "Updated Title",
  "start_datetime": "2024-03-20T10:00:00",
  "end_datetime": "2024-03-20T11:00:00",
  "participant_count": 8,
  "description": "Updated Description"
}
```

### **RoomResponse (ข้อมูลห้องที่ส่งกลับ)**
```json
{
  "id": 1,
  "name": "Meeting Room A",
  "capacity": 10,
  "location": "Floor 2",
  "description": "Projector available",
  "start_time": "09:00:00",
  "end_time": "18:00:00",
  "is_active": true,
  "created_at": "2024-03-19T10:00:00"
}
```

### **BookingResponse (ข้อมูลการจองที่ส่งกลับ)**
```json
{
  "id": 1,
  "room_id": 1,
  "room_name": "Meeting Room A",
  "title": "Team Weekly Sync",
  "organizer_name": "John Doe",
  "organizer_email": "john@example.com",
  "participant_count": 5,
  "start_datetime": "2024-03-20T09:00:00",
  "end_datetime": "2024-03-20T10:00:00",
  "description": "Discuss weekly progress",
  "notes": "Prepare slides",
  "is_cancelled": false,
  "cancelled_at": null,
  "cancellation_reason": null,
  "created_at": "2024-03-19T12:00:00"
}
```
