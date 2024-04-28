/**
 * @swagger
 * components:
 *  schemas:
 *    Announcement:
 *      type: object
 *      required:
 *        - title
 *        - content
 *        - startDate
 *        - endDate
 *        - campground
 *        - author
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the announcement
 *        title:
 *          type: string
 *          description: Title of the announcement
 *        content:
 *          type: string
 *          description: Content of the announcement
 *        startDate:
 *          type: string
 *          format: date-time
 *          description: Start date for announcing
 *        endDate:
 *          type: string
 *          format: date-time
 *          description: End date for announcing
 *        campground:
 *          type: string
 *          description: ID of campground where owns the announcement
 *        author:
 *          type: string
 *          description: The author's name
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Created time
 *    Transaction:
 *      type: object
 *      required:
 *        - status
 *        - rent_date
 *        - campground
 *        - user
 *        - appointment
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the transaction
 *        status:
 *          type: string
 *          description: Status of the transaction ["WAITING", "VERIFYING", "COMPLETED", "REJECTED", "CANCELED"]
 *        rent_date:
 *          type: string
 *          format: date-time
 *          description: Timestamp of Transaction Creation
 *        successful_payment_date:
 *          type: string
 *          format: date-time
 *          description: Timestamp when the transaction status is "COMPLETED"
 *        submitted_slip_images:
 *          type: array
 *          items:
 *              type: string
 *          description: ID of transaction slips that have submitted by the user
 *        successful_payment_slip_image:
 *          type: string
 *          description: ID of the transaction slip, applicable only when the transaction status is "COMPLETED"
 *        campground:
 *          type: string
 *          description: ID of campground that transaction paid for
 *        user:
 *          type: string
 *          description: ID of user who make the transaction
 *        appointment:
 *          type: string
 *          description: ID of appointment that linked to the transaction
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Created time 
 *    TransactionSlip:
 *      type: object
 *      required:
 *        - slip_image
 *        - submit_time
 *        - payment_id
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the transaction slip
 *        slip_image:
 *          type: string
 *          format: byte
 *          description: Slip image of the transaction
 *        submit_time:
 *          type: string
 *          format: date-time
 *          description: Timestamp
 *        payment_id:
 *          type: string
 *          description: ID of the transaction which owns the transaction slip
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Created time
 */

/** Announcement */

/**
 * @swagger
 *  tags:
 *      name: Announcement APIs
 *      description: APIs for getting, creating, updating, and deleting announcements.
 */
/**
 * @swagger
 *  paths:
 *    /announcements:
 *      get:
 *        summary: API for getting all announcements.
 *        tags:
 *          - Announcement APIs
 *        responses:
 *          200:
 *            description: Returns a list of all announcements.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Announcement'
 *          500:
 *            description: Cannot find announcements.
 *    /campgrounds/{campgroundId}/announcements:
 *      get:
 *        summary: API for getting announcements by campground ID.
 *        tags:
 *          - Announcement APIs
 *        parameters:
 *          - in: path
 *            name: campgroundId
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Returns a list of all announcements associated with the provided campgroundId.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Announcement'
 *          500:
 *            description: Cannot find announcements.
 *    /announcements/{announcementId}:
 *      get:
 *        summary: API for getting an announcement by announcement ID.
 *        tags:
 *          - Announcement APIs
 *        parameters:
 *          - in: path
 *            name: announcementId
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Returns an announcement associated with the provided announcementId.
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Announcement'
 *          400:
 *            description: Cannot find an announcement associated with the provided announcementId.
 *          500:
 *            description: Cannot find an announcement.
 */
/**
 * @swagger
 *  paths:
 *    /announcements:
 *      post:
 *        summary: API for creating an announcement.
 *        tags:
 *          - Announcement APIs
 *        requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Announcement'
 *        responses:
 *          201:
 *            description: An announcements was successfully created.
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Announcement'
 *          500:
 *            description: Cannot create an announcement.
 */
/**
 * @swagger
 *  paths:
 *    /announcements/{announcementId}:
 *      put:
 *        summary: API for updating an announcement by announcement ID.
 *        tags:
 *          - Announcement APIs
 *        parameters:
 *          - in: path
 *            name: announcementId
 *            schema:
 *              type: string
 *            required: true
 *        requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Announcement'
 *        responses:
 *          200:
 *            description: An announcements was successfully updated.
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Announcement'
 *          400:
 *            description: Cannot find an announcement associated with the provided announcementId.
 *          500:
 *            description: Cannot update an announcement.
 */
/**
 * @swagger
 *  paths:
 *    /announcements/{announcementId}:
 *      delete:
 *        summary: API for deleting an announcement by announcement ID.
 *        tags:
 *          - Announcement APIs
 *        parameters:
 *          - in: path
 *            name: announcementId
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: An announcements was successfully deleted.
 *          404:
 *            description: Cannot find an announcement associated with the provided announcementId.
 *          500:
 *            description: Cannot delete an announcement.
 */

/** Transaction */

/**
 * @swagger
 *  tags:
 *      name: Transaction APIs
 *      description: APIs for getting, creating, updating, and deleting transactions.
 */
/**
 * @swagger
 *  paths:
 *    /transactions:
 *      get:
 *        summary: API for getting all transactions.
 *        tags:
 *          - Transaction APIs
 *        responses:
 *          200:
 *            description: Returns a list of all transactions.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Transaction'
 *          500:
 *            description: Cannot find transactions.
 *    /transactions/{transactionId}:
 *      get:
 *        summary: API for getting a transaction by transaction ID.
 *        tags:
 *          - Transaction APIs
 *        parameters:
 *          - in: path
 *            name: transactionId
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Returns a transaction associated with the provided transactionId.
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Transaction'
 *          404:
 *            description: Cannot find a transaction associated with the provided transactionId.
 *          500:
 *            description: Cannot find a transaction.
 */
/**
 * @swagger
 * paths:
 *  /transactions/{appointmentId}:
 *    post:
 *      summary: API for creating a transaction.
 *      tags:
 *        - Transaction APIs
 *      parameters:
 *        - in: path
 *          name: appointmentId
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                  schema:
 *                      type: object
 *                      required: 
 *                          - user
 *                          - appointment
 *                      properties:
 *                          user:
 *                              type: string
 *                          appointment:
 *                              type: string
 *      responses:
 *        201:
 *          description: A transaction was successfully created.
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Transaction'
 *        401:
 *          description: An appointment already has a transaction.
 *        404:
 *          description: Cannot find an appointment associated with the provided appointmentId or Cannot find a campground.
 *        500:
 *          description: Cannot create a transaction.
 */
/**
 * @swagger
 *  paths:
 *    /transactions/{transactionId}:
 *      put:
 *        summary: API for updating a transaction by transaction ID.
 *        tags:
 *          - Transaction APIs
 *        parameters:
 *          - in: path
 *            name: transactionId
 *            schema:
 *              type: string
 *            required: true
 *        requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  type: object
 *                  schema:
 *                      required:
 *                          - status
 *                      properties:
 *                          status:
 *                              type: string
 *        responses:
 *          200:
 *            description: A transaction was successfully updated.
 *            content:
 *              application/json:
 *                schema:
 *                  items:
 *                    $ref: '#/components/schemas/Announcement'
 *          401:
 *            description: Cannot find a transaction associated with the provided transactionId. / Status is invalid form.
 *          404:
 *            description: Cannot find a transaction associated with the provided transactionId. / Status is unavailable to update.
 *          500:
 *            description: Cannot update a transaction.
 */

/**
 * @swagger
 *  tags:
 *      name: PromptpayQR APIs
 *      description: A promptpayQR for a transaction.
 */
/**
 * @swagger
 * paths:
 *  /transactions/promptpayqr:
 *    post:
 *      summary: API for creating a promptpayQR for a transaction.
 *      tags:
 *        - PromptpayQR APIs
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                  schema:
 *                      type: object
 *                      required: 
 *                          - transactionId
 *                      properties:
 *                          transactionId:
 *                              type: string
 *      responses:
 *        200:
 *          description: A promptpayQR was successfully created.
 *          content:
 *              image/svg+xml:
 *                  schema:
 *                      type: string
 *        400:
 *          description: Missing a transactionId.
 *        404:
 *          description: Cannot find a transaction associated with the provided transactionId.
 *        500:
 *          description: Cannot create a promptpayQR for a transaction.
 */
/**

/** Transaction Slip */

/**
 * @swagger
 *  tags:
 *      name: Transaction Slip APIs
 *      description: API for getting, and creating for transaction slips.
 */
/**
 * @swagger
 *  paths:
 *    /transactionslips:
 *      get:
 *        summary: API for getting all transaction slips.
 *        tags:
 *          - Transaction Slip APIs
 *        responses:
 *          200:
 *            description: Returns a list of all transaction slips.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/TransactionSlip'
 *          500:
 *            description: Cannot find transaction slips.
 *    /transactionslips/{transactionSlipId}:
 *      get:
 *        summary: API for getting a transaction slip by transaction ID.
 *        tags:
 *          - Transaction Slip APIs
 *        parameters:
 *          - in: path
 *            name: transactionSlipId
 *            schema:
 *              type: string
 *            required: true
 *        responses:
 *          200:
 *            description: Returns a transaction slip associated with the provided transactionSlipId.
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/TransactionSlip'
 *          401:
 *            description: User is not authorized to get this a transction slip.
 *          404:
 *            description: Cannot find a transaction slip associated with the provided transactionSlipId.
 *          500:
 *            description: Cannot find a transaction slip.
 */
/**
 * @swagger
 * paths:
 *  /transactions/{transactionId}/transactionslips:
 *    post:
 *      summary: API for creating a transaction slip.
 *      tags:
 *        - Transaction Slip APIs
 *      parameters:
 *        - in: path
 *          name: transactionId
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                  schema:
 *                      type: object
 *                      required: 
 *                          - transactionId
 *                      properties:
 *                          transactionId:
 *                              type: string
 *      responses:
 *        201:
 *          description: A transaction slip was successfully created.
 *          content:
 *            application/json:
 *        400:
 *          description: Cannot create a transaction slip for this transactionId.
 *        404:
 *          description: Cannot find a transaction associated with the provided transactionId.
 *        500:
 *          description: Cannot create a transaction slip.
 */