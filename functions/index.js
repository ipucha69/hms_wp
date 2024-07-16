/* eslint-disable spaced-comment */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { initializeApp } = require("firebase-admin/app");
const { setGlobalOptions } = require("firebase-functions/v2");

initializeApp();
setGlobalOptions({ maxInstances: 10 });

const helloWorld = require("./src/helloWorld");
const createUser = require("./src/createUser");
const updateUser = require("./src/updateUser");
const updatePassword = require("./src/updatePassword");
const createManager = require("./src/createManager");
const updateManager = require("./src/updateManager");

//================= STOCKS =========================

const createStock = require("./src/stocks/createStock");
const updateStock = require("./src/stocks/updateStock");

const createTransferStock = require("./src/stocks/createTransferStock");
const updateStockTransfer = require("./src/stocks/updateStockTransfer");
const stockTransfer = require("./src/stocks/stockTransfer");
const stockDistribution = require("./src/stocks/stockDistribution");

//================ SUPPLIERS ========================

const createSupplier = require("./src/supplier/createSupplier");
const updateSupplier = require("./src/supplier/updateSupplier");
const createSupplierPayment = require("./src/supplier/createSupplierPayment");
const updateSupplierPayment = require("./src/supplier/updateSupplierPayment");

//================ CUSTOMERS ========================

const createCustomer = require("./src/customer/createCustomer");
const updateCustomer = require("./src/customer/updateCustomer");
const createCustomerPayment = require("./src/customer/CreateCustomerPayment");
const updateCustomerPayment = require("./src/customer/EditCustomerPayment");

//================ STATION ========================

const createPump = require("./src/station/CreatePump");
const deletePump = require("./src/station/DeletePump");
const createPumpCard = require("./src/station/CreatePumpCard");

//================ SALES ========================

const initializeDayBook = require("./src/sales/InitializeDayBook");
const fetchDayBook = require("./src/sales/FetchDayBook");
const createNewBook = require("./src/sales/CreateNewBook");
const createSale = require("./src/sales/CreateSale");
const createDebtor = require("./src/sales/CreateDebtor");
const createExpense = require("./src/sales/CreateExpense");
const createDebtorCash = require("./src/sales/CreateDebtorCash");
const updateDebtor = require("./src/sales/UpdateDebtor");
const updateExpense = require("./src/sales/UpdateExpense");
const closeDayBook = require("./src/sales/CloseDayBook");
const fetchSalesBook = require("./src/sales/FetchSalesBook");
const fetchSalesAccount = require("./src/sales/FetchSalesAccount");

exports.helloWorld = helloWorld.helloWorld;
exports.createUser = createUser.createUser;
exports.updateUser = updateUser.updateUser;
exports.updatePassword = updatePassword.updatePassword;

exports.createManager = createManager.createManager;
exports.updateManager = updateManager.updateManager;

exports.createStock = createStock.createStock;
exports.updateStock = updateStock.updateStock;

exports.createTransferStock = createTransferStock.createTransferStock;
exports.updateStockTransfer = updateStockTransfer.updateStockTransfer;
exports.stockTransfer = stockTransfer.stockTransfer;
exports.stockDistribution = stockDistribution.stockDistribution;

exports.createSupplier = createSupplier.createSupplier;
exports.updateSupplier = updateSupplier.updateSupplier;
exports.createSupplierPayment = createSupplierPayment.createSupplierPayment;
exports.updateSupplierPayment = updateSupplierPayment.updateSupplierPayment;

exports.createCustomer = createCustomer.createCustomer;
exports.updateCustomer = updateCustomer.updateCustomer;
exports.createCustomerPayment = createCustomerPayment.createCustomerPayment;
exports.updateCustomerPayment = updateCustomerPayment.updateCustomerPayment;

exports.createPump = createPump.createPump;
exports.deletePump = deletePump.deletePump;
exports.createPumpCard = createPumpCard.createPumpCard;

exports.initializeDayBook = initializeDayBook.initializeDayBook;
exports.fetchDayBook = fetchDayBook.fetchDayBook;
exports.createNewBook = createNewBook.createNewBook;
exports.createSale = createSale.createSale;
exports.createDebtor = createDebtor.createDebtor;
exports.createExpense = createExpense.createExpense;
exports.createDebtorCashSale = createDebtorCash.createDebtorCash;
exports.updateDebtor = updateDebtor.updateDebtor;
exports.updateExpense = updateExpense.updateExpense;
exports.closeDayBook = closeDayBook.closeDayBook;
exports.fetchSalesBook = fetchSalesBook.fetchSalesBook;
exports.fetchSalesAccount = fetchSalesAccount.fetchSalesAccount;