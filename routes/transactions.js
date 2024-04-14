const express = require("express");
const {
  createPromptpayQR,
  getTransactions,
  getTransaction,
  updateTransaction,
} = require("../controllers/transactions");

const transactionSlipRouter = require("./transactionslips");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

router.use("/:transactionId/transactionslips/", transactionSlipRouter);

router
  .route("/promptpayqr")
  .post(protect, authorize("admin", "user"), createPromptpayQR);

router.route("/")
    .get(protect, authorize("admin", "user"), getTransactions);

router.route("/:id")
    .get(protect, authorize("admin", "user"), getTransaction)
    .put(protect, authorize("admin", "user"), updateTransaction);

module.exports = router;
