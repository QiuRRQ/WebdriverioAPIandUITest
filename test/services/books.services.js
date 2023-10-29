import axios from 'axios';

const AS_BASE_URL = "https://bookstore.toolsqa.com";

class BooksService {

    async registerUser(data) {
        const response = await axios.post(`${AS_BASE_URL}/Account/v1/User`, data)
        return response;
    }

    async generateToken(data) {
        try {
            let response = await axios.post(AS_BASE_URL + `/Account/v1/GenerateToken`, data)
            return response;
        } catch (err) {
            return err;
        }
    }

    async authorizeUser(data) {
        try {
            let response = await axios.post(AS_BASE_URL + `/Account/v1/Authorized`, data)
            return response;
        } catch (err) {
            return err;
        }
    }

    async getISBNCollections() {
        try {
            let response = await axios.get(AS_BASE_URL + `/BookStore/v1/Books`)
            return response;
        } catch (err) {
            return err;
        }
    }

    async postBooks(data, username, password, usertoken) {
        try {
            let response = await axios.post(AS_BASE_URL + `/BookStore/v1/Books`, data, {
                auth: {
                    username: username,
                    password: password
                },
                headers: {
                    'Authorization': usertoken
                }
            })
            return response;
        } catch (err) {
            return err;
        }
    }

    async deleteBooks(userID, username, password, usertoken) {
        try {
            let response = await axios.delete(AS_BASE_URL + `/BookStore/v1/Books?UserId=` + userID, {
                auth: {
                    username: username,
                    password: password
                },
                headers: {
                    'Authorization': usertoken
                }
            })
            return response;
        } catch (err) {
            return err;
        }
    }
}
export default new BooksService();