/**
 * @swagger
 * tags:
 *   name: messagerulevalue
 *   description: Home page
 */

/**
 * @swagger
 * /messagerulevalue:
 *   get:
 *     summary: Get messagerulevalues based on query parameters.
 *     tags: [messagerulevalue]
 *     parameters:
 *       - in: query
 *         name: messagerulevalue_key
 *         schema:
 *           type: string
 *         description: messagerulevalue_key filter.
 *       - in: query
 *         name: dbcref_key
 *         schema:
 *           type: string
 *         description: dbcref_key filter.
 *     responses:
 *       '200':
 *         description: Successful response with messagerules.
 *         content:
 *           application/json:
 *             example:
 *               messagerules:
 *                 - messagerules
 *                 - row_count
 *                 - message
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /messagerulevalue:
 *   post:
 *     summary: Create a new messagerule.
 *     tags: [messagerulevalue]
 *     parameters:
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: number
 *         description: policy_key filter.
 *       - in: query
 *         name: dbcref_key
 *         schema:
 *           type: number
 *         description: dbcref_key filter.
 *       - in: query
 *         name: ruletype_key
 *         schema:
 *           type: number
 *         description: ruletype_key filter.
 *       - in: query
 *         name: messagerule_id
 *         schema:
 *           type: number
 *         description: messagerule_id filter.
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: value filter.
 *     responses:
 *       '200':
 *         description: Successful response with result and lastID.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               lastID: 1
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /messagerulevalue:
 *   delete:
 *     summary: delete a messagerulevalue.
 *     tags: [messagerulevalue]
 *     parameters:
 *       - in: query
 *         name: messagerulevalue_key
 *         schema:
 *           type: string
 *         description: messagerulevalue key filter.
 *     responses:
 *       '200':
 *         description: Successfully deleted the messagerulevalue.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: Successfully deleted the messagerulevalue.
 *       '202':
 *         description: Accepted with a warning during the delete process.
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: Warning message during delete.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /messagerulevalue/set:
 *   post:
 *     summary: Set a new messagerule.
 *     tags: [messagerulevalue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messagerulevalues:
 *                 type: string
 *                 description: Messagerulevalues filter.
 *     responses:
 *       '200':
 *         description: Successful response with result and lastID.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               lastID: [1, 2, 3, 4, 5]
 *       '500':
 *         description: Internal server error.
 */