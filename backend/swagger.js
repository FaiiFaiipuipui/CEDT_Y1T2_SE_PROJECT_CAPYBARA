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
 *          type: string[]
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
 */
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
 *            description: Returns an announcements associated with the provided announcementId.
 *            content:
 *              application/json:
 *                schema:
 *                  items:
 *                    $ref: '#/components/schemas/Announcement'
 *          400:
 *            description: Cannot find an announcement associated with the provided announcementId.
 *          500:
 *            description: Cannot find an announcement.
 */