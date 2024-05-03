/**
 * @swagger
 * tags:
 *   name: dbcraw
 *   description: Home page
 */

/**
 * @swagger
 * /dbcraw:
 *   get:
 *     summary: Get dbcraws based on query parameters.
 *     tags: [dbcraw]
 *     parameters:
 *       - in: query
 *         name: dbc_key
 *         schema:
 *           type: string
 *         description: Section filter.
 *     responses:
 *       '200':
 *         description: Successful response with dbcraws.
 *         content:
 *           application/json:
 *             example:
 *               profiles:
 *                 - profiles
 *                 - row_count
 *                 - message
 *       '500':
 *         description: Internal server error.
 */
