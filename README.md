#  URL Shortener Backend (With Logging Middleware)

This project is a **backend microservice** that allows users to shorten URLs, track their usage statistics, and handles redirection. It also includes a **custom logging middleware** that logs every important operation to a remote test server using secure authentication.

---

## Functionalities

* Shortens long URLs with either a **custom or auto-generated shortcode**
* Allows setting an **optional expiry time** (defaults to 30 minutes)
* Logs actions like creation, errors, redirections using a **centralized logging server**
* Tracks **click stats** (timestamps, referrer, etc.)
* Redirects to the original URL using the shortcode

---

##  Technologies Used

* Node.js
* Express.js
* JavaScript (CommonJS)
* Axios (for logging middleware)
* NanoID (for generating unique codes)
* dotenv (for token handling)

---

## 🛠️ How to Run It Locally

1. **Clone the Repository**

```bash
git clone https://github.com/adarsh7raj/2200970100009
cd backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Your `.env` Token**

Create a `.env` file in the root directory with:

```env
ACCESS_TOKEN=your_access_token_from_test_server
```

4. **Start the Server**

```bash
node index.js
```

App will run at: `http://localhost:3000`

---

## 📌 API Endpoints

### 🔹 Create Short URL

* **POST** `/shorturls`
* **Request Body** (JSON):

```json
{
  "url": "https://example.com/very/long/link",
  "validity": 30,
  "shortcode": "custom123"
}
```

* `url` (required): Long URL to shorten

* `validity` (optional): Minutes the URL is valid (defaults to 30)

* `shortcode` (optional): Desired shortcode

* **Success Response:**

```json
{
  "shortLink": "http://localhost:3000/custom123",
  "expiry": "2025-01-01T00:30:00Z"
}
```

---

###  Get URL Stats

* **GET** `/shorturls/:shortcode`

* **Response:**

```json
{
  "originalUrl": "https://example.com/very/long/link",
  "createdAt": "2025-01-01T00:00:00Z",
  "expiry": "2025-01-01T00:30:00Z",
  "clickCount": 2,
  "clicks": [
    {
      "timestamp": "2025-01-01T00:10:00Z",
      "referrer": "direct",
      "location": "IN"
    }
  ]
}
```

---

### 🔹 Redirect to Original URL

* **GET** `/:shortcode`
* Automatically redirects to original long URL
* If expired or invalid, shows proper error

---

##  How Logging Works

A reusable middleware function sends logs to:

```
POST http://20.244.56.144/evaluation-service/logs
```

Each log includes:

```json
{
  "stack": "backend",
  "level": "info" | "error" | "warn",
  "package": "controller" | "handler" | ...,
  "message": "description of event"
}
```

Authorization is done using a Bearer token stored securely in `.env`.

Example log:

```js
await log("backend", "info", "controller", "short URL created for custom123");
```

---

##  Screenshot Examples

###  Create Short URL (Success)

![Screenshot 2025-06-27 183401](https://github.com/user-attachments/assets/d54db623-783e-4542-a31d-59efc199c9e5)


###  Invalid URL (Error)

![Screenshot 2025-06-27 165135](https://github.com/user-attachments/assets/8176fe31-8c94-47bb-9be1-eb20623b2e0c)
![Screenshot 2025-06-27 165717](https://github.com/user-atta![Screenshot 2025-06-27 170655](https://github.com/user-attachments/assets/1e1925fc-bb63-4574![Screenshot 2025-06-27 170728](https://github.com/user-attachments/assets/77671e38-f187-4935-8c50-88d09892cf94)
-8ce5-b43bb23d37af)
chments/assets/f6d5e31b-244e-4adf-bc3e-e025dcb70f84)


###  Get Stats

![Screenshot 2025-06-27 182402](https://github.com/user-attachments/assets/133dab85-9f61-4f48-8b9a-4b180b5dc5c7)



---

##  Author

**Adarsh Raj Yadav**
Roll No: `220097010009`
Email: `adarsh.22gcebcs179@galgotiacollege.edu`
