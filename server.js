const express = require('express')
const app = express()

//middleware
app.use(express.json())



let rooms = [
  {
    id: 1,
    name: "Normal",
    seats: 2,
    roomId: 1,
    amenities: ["food", "ac", "tv"],
    price: 1000,
    BookingStatus: "Occupied",
    customerDetails: {
      customerName: "Alex",
      date: "20-12-2023",
      start: "10:00",
      end: "06:00",
      roomId: "1",
      status: "Booked",
    }
  },
  {
    id: 2,
    name: "Large",
    seats: 15,
    roomId: 2,
    amenities: ["internet_access", "food", "ac", "tv"],
    price: 7500,
    BookingStatus: "Available",
    customerDetails: {
      customerName: "",
      date: "",
      start: "",
      end: "",
      roomId: "2",
      status: "",
    }
  },
  {
    id: 3,
    name: "Small",
    seats: 10,
    roomId: 3,
    amenities: ["food", "tv"],
    price: 5000,
    BookingStatus: "Available",
    customerDetails: {
      customerName: "",
      date: "",
      start: "",
      end: "",
      roomId: "3",
      status: "",
    }
  },
  {
    id: 4,
    name: "extra large",
    seats: 25,
    roomId: 4,
    amenities: ["internet_access", "food", "ac", "tv"],
    price: 12500,
    BookingStatus: "Occupied",
    customerDetails: {
      customerName: "Arun",
      date: "15-12-2023",
      start: "1:00",
      end: "22:00",
      roomId: "4",
      status: "Booked",
    }
  }
];

// get all data from room
app.get('/', function (req, res) {
  res.send(rooms)
})


//create room
app.post('/create-room', function (req, res) {
  try {
    req.body.id = rooms.length + 1;
    rooms.push(req.body)
    res.json({
      statusCode: 200,
      message: "Room created successfully",

    })
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    })
  }
})

// Room booking
app.post('/room-booking', function (req, res) {
  try {
    let booked = false;
    let validRoomid = true;
    rooms.forEach((item) => {
      if (item.roomId == req.body.roomId) {
        validRoomid = false;
        if (new Date(item.customerDetails.date).getTime() != new Date(req.body.date).getTime() && item.customerDetails.start != req.body.start) {
          item.customerDetails.customerName = req.body.customerName,
            item.customerDetails.date = req.body.date,
            item.customerDetails.start = req.body.start,
            item.customerDetails.end = req.body.end,
            item.customerDetails.roomId = req.body.roomId,
            item.customerDetails.status = "Booked",
            item.BookingStatus = "Occupied",
            booked = true;
        }
      }

    })

    if (booked) {
      res.json({
        message: "Booking Successfull"
      })
    }
    if (validRoomid) {
      res.json({
        message: "Please Enter Valid Room"
      })
    } else {
      res.json({
        message: "Booking Failed",
        instruction: "Sorry! Room is Already Booked and check the availability"
      })
    }

  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    })
  }
})



// booked-customer-details

app.get('/booked-customer-details', function (req, res) {

  try {
    let data = [];

    rooms.forEach((item) => {
      if (item.BookingStatus == "Occupied") {
        data.push(item.customerDetails)
      }
    })
    res.json({
      statusCode: 200,
      Booked_Customer_Details: data,
    })

  } catch (error) {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    })
  }

})


// Booked Room Details

app.get('/booked-room-details', function (req, res) {

  try {
    let data = [];

    rooms.forEach((item) => {
      if (item.BookingStatus == "Occupied") {
        data.push({
          name: item.name,
          seats: item.seats,
          amenities: item.amenities,
          price: item.price,
          BookingStatus: item.BookingStatus,
          customerName: item.customerDetails.customerName,
          date: item.customerDetails.date,
          start: item.customerDetails.start,
          end: item.customerDetails.end,
          roomId: item.customerDetails.roomId,
        })
      }
    })
    res.json({
      statusCode: 200,
      Booked_Room_Details: data,
    })

  } catch (error) {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    })
  }

})

app.listen(process.env.PORT || 6000)