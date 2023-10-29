import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import BooksService from "../services/books.services.js";

// const ISBNschema = require('../Schema/ISBNSchema.js');
// const BOOKSschema = require('../Schema/BOOKSSchema.js');
// const { validate: validateSchema } = require('jsonschema');

//buat variable yang berguna untuk menyimpan data
var userID;
var username;
var password;
var userToken;
var isbnCollections;

function generateRandomStringWithRequirements(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const charactersLength = characters.length;
    let result = '';

    // Menghasilkan setidaknya satu huruf
    result += characters.charAt(Math.floor(Math.random() * 52)); // 52 adalah jumlah huruf besar dan kecil

    // Menghasilkan setidaknya satu angka
    result += characters.charAt(Math.floor(Math.random() * 10) + 52); // Mulai dari 52 karena sebelumnya sudah ada 52 karakter huruf

    // Menghasilkan setidaknya satu karakter khusus
    result += characters.charAt(Math.floor(Math.random() * 15) + 62); // Mulai dari 62 karena sebelumnya sudah ada 62 karakter (52 huruf dan 10 angka)

    // Menghasilkan karakter acak untuk sisa panjang string
    for (let i = 3; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Mengacak urutan karakter
    result = result.split('').sort(() => Math.random() - 0.5).join('');

    return result;
}

username = generateRandomStringWithRequirements(6);
console.log(username);
password = "Admin123!";
console.log(password);

describe('DOT Swager TEST', () => {

    it('daftarkan user baru', async () => {
        const data = {
            userName: username,
            password: password,
        };
        const response = await browser.call(async () => await BooksService.registerUser(data));
        expect(response.status).toEqual(201);
        expect(response.data).toHaveProperty('userID');
        expect(response.data).toHaveProperty('username');
        expect(response.data).toHaveProperty('books');
        const responseData = response.data;
        userID = responseData.userID;
    });

    it('Generate Token untuk user yang sudah di Authorized', async () => {
        const reqdata = {
            userName: username,
            password: password,
        };
        const response = await browser.call(async () => await BooksService.generateToken(reqdata));
        expect(response.status).toEqual(200);
        expect(response.data).toHaveProperty('token');
        expect(response.data).toHaveProperty('expires');
        expect(response.data).toHaveProperty('status');
        expect(response.data).toHaveProperty('result');

        userToken = response.data.token;
        console.log(userToken);
    });

    it('Authorize user yang sudah di daftarkan sebelumnya', async () => {
        const reqdata = {
            userName: username,
            password: password,
        };
        const response = await browser.call(async () => await BooksService.authorizeUser(reqdata));
        expect(response.status).toEqual(200);
        expect(response.data).toBeTruthy;
        console.log(response.data);
    });

    it('Get ISBN collection terhadap user tersebut', async () => {

        const response = await browser.call(async () => await BooksService.getISBNCollections());
        expect(response.status).toEqual(200);

        // // Melakukan validasi respons JSON dengan skema yang diimpor
        // const validationResult = validateSchema(response.data, ISBNschema);

        // // Memeriksa apakah validasi berhasil
        // expect(validationResult.errors).toBe.empty;

        isbnCollections = response.data.books.map(book => ({ isbn: book.isbn }));
        console.log(isbnCollections);
    });

    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login(username, password);
        await LoginPage.token(userToken);

    });

    it('Test API pada POST /BookStore/v1/Books ', async () => {

        const reqdata = {
            userId: userID,
            collectionOfIsbns: isbnCollections,
        };
        const response = await browser.call(async () => await BooksService.postBooks(reqdata, username, password, userToken));

        expect(response.status).toEqual(201);

        // // Melakukan validasi respons JSON dengan skema yang diimpor
        // const validationResult = validateSchema(response.data, BOOKSschema);

        // // Memeriksa apakah validasi berhasil
        // expect(validationResult.errors).toBe.empty;
    });

    it('Test API pada DELETE /BookStore/v1/Books ', async () => {

        const response = await browser.call(async () => await BooksService.deleteBooks(userID, username, password, userToken));

        expect(response.status).toEqual(204);

        // // Melakukan validasi respons JSON dengan skema yang diimpor
        // const validationResult = validateSchema(response.data, BOOKSschema);

        // // Memeriksa apakah validasi berhasil
        // expect(validationResult.errors).toBe.empty;
    });

})

