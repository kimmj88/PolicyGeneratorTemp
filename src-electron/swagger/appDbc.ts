/**
 * @swagger
 * tags:
 *   name: dbc
 *   description: Home page
 */

/**
 * @swagger
 * /dbc:
 *   get:
 *     summary: Get dbcs based on query parameters.
 *     tags: [dbc]
 *     parameters:
 *       - in: query
 *         name: dbc_key
 *         schema:
 *           type: string
 *         description: dbc_key filter.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: name filter.
 *     responses:
 *       '200':
 *         description: Successful response with dbcs.
 *         content:
 *           application/json:
 *             example:
 *               dbcs:
 *                 - dbcs
 *                 - row_count
 *                 - message
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dbc:
 *   post:
 *     summary: Create a new dbc.
 *     tags: [dbc]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: name filter.
 *       - in: query
 *         name: path
 *         schema:
 *           type: string
 *         description: file path filter.
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
 * /dbc:
 *   delete:
 *     summary: delete a dbc.
 *     tags: [dbc]
 *     parameters:
 *       - in: query
 *         name: dbc_key
 *         schema:
 *           type: string
 *         description: dbc Key filter.
 *     responses:
 *       '200':
 *         description: Successfully deleted the dbc.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: Successfully deleted the dbc.
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
 /**
 * @swagger
 * /dbc/{dbc_key}:
 *   put:
 *     summary: Update a dbc based on the provided dbc_key
 *     tags: [dbc]
 *     description: Update a dbc using the specified dbc_key and parameters.
 *     parameters:
 *       - in: path
 *         name: dbc_key
 *         required: true
 *         schema:
 *           type: string
 *         description: The key of the dbc to be updated.
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: The type associated with the dbc.
 *     responses:
 *       '200':
 *         description: Successfully updated the dbc.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: Successfully updated the dbc.
 *       '202':
 *         description: Accepted with a warning during the update process.
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: Warning message during update.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               result: false
 *               message: Internal Server Error.
 */
