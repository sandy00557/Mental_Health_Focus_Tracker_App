import axios from 'axios'; //npm install axios 

/*rules of connection:
1.CORS ERROR:
❌ Error:
When frontend tries to call the backend:
Access to fetch at 'http://localhost:5000/api/v1/auth/register' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
✅ Fix:
In backend/server.js, add:
const cors=require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true//Allow cookies to be sent from frontend
//}));
 origin must match the frontend origin and credentials: true is a must if you're using cookies.


 ✅ 2. Cookie Not Set
❌ Error:
Your user is logged in, but the cookie (jwt) is not appearing in browser or not sent to backend.
✅ Fix: Ensure we have axios.js and app.use(cors)

✅ 3. Cannot Connect to MongoDB
❌ Error:MongooseServerSelectionError: connect ECONNREFUSED or MongoTimeoutError
Fix:
Check your .env file for the correct MongoDB URI and ensure you have internet access if using MongoDB Atlas.
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

  
 */



//axios helps to connect frontend with backend..baseUrl helps to attach only remaining url for backend. withCredentials means it sents jwt token with cookies for every request sent if valid.
const API=axios.create({
    // baseURL:process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
    baseURL:'http://localhost:5000/api/v1',
    withCredentials:true, 
})

export default API;

/*
| Error                     | Fix                                                               |
| ------------------------- | ----------------------------------------------------------------- |
| CORS error                | Make sure `cors({ origin, credentials: true })` in backend        |
| Cookie not set            | Use `withCredentials: true` in Axios and allow cookies in backend |
| Cannot connect to MongoDB | Check your `.env` Mongo URI and internet if using Atlas           |
| `npm start` crashes       | Check for typos in `.env` or wrong import paths                   |

*/

/*What withCredentials: true Does:
This ensures cookies are sent with requests to maintain session or JWT token-based login.

So after user signs in and gets a token cookie:

Every call using API.get(...) or API.post(...) will automatically include that cookie in the request.

This allows protected backend routes to validate the user. */

/*without the above axios.js file 
axios.post('http://localhost:5000/api/v1/auth/register', userData, {
  withCredentials: true
});
Add the full url manually 
Remember to include withCredentials each time 


with above axios.js file 
API.post('/auth/register', userData);




✅ Axios attaches baseURL → becomes http://localhost:5000/api/v1/auth/register

✅ Axios attaches cookies from browser

✅ Sends data to backend route → handled by authController.register
 */