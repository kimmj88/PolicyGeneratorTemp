/**
 * @swagger
 * tags:
 *   name: ruletype
 *   description: Home page
 */

/**
 * @swagger
 * /ruletype:
 *   get:
 *     summary: Get ruletypes based on query parameters.
 *     tags: [ruletype]
 *     parameters:
 *       - in: query
 *         name: ruletype_key
 *         schema:
 *           type: string
 *         description: Section filter.
 *     responses:
 *       '200':
 *         description: Successful response with profiles.
 *         content:
 *           application/json:
 *             example:
 *               ruletypes:
 *                 - ruletypes
 *                 - row_count
 *                 - message
 *       '500':
 *         description: Internal server error.
 */
