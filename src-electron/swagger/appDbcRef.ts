/**
 * @swagger
 * tags:
 *   name: dbcRef
 *   description: Home page
 */

/**
 * @swagger
 * /dbcRef:
 *   get:
 *     summary: Get dbcRefs based on query parameters.
 *     tags: [dbcRef]
 *     parameters:
 *       - in: query
 *         name: dbcref_key
 *         schema:
 *           type: string
 *         description: dbcref_key filter.
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: string
 *         description: policy_key filter.
 *     responses:
 *       '200':
 *         description: Successful response with dbcRefs.
 *         content:
 *           application/json:
 *             example:
 *               dbcRefs:
 *                 - dbcRefs
 *                 - row_count
 *                 - message
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dbcRef:
 *   post:
 *     summary: Create a new dbcRef.
 *     tags: [dbcRef]
 *     parameters:
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: string
 *         description: policy_key filter.
 *       - in: query
 *         name: dbc_key
 *         schema:
 *           type: string
 *         description: file dbc_key filter.
 *       - in: query
 *         name: bus_number
 *         schema:
 *           type: string
 *         description: file bus_number filter.
 *     responses:
 *       '200':
 *         description: Successful response with result and lastID.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               lastID: 20
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dbcRef:
 *   delete:
 *     summary: delete a dbcRef.
 *     tags: [dbcRef]
 *     parameters:
 *       - in: query
 *         name: dbcref_key
 *         schema:
 *           type: string
 *         description: dbcref_key filter.
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: string
 *         description: policy_key filter.
 *     responses:
 *       '200':
 *         description: Successfully deleted the dbcref.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: Successfully deleted the dbcref.
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
