/**
 * @swagger
 * tags:
 *   name: profile
 *   description: Home page
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get profiles based on query parameters.
 *     tags: [profile]
 *     parameters:
 *       - in: query
 *         name: section
 *         schema:
 *           type: string
 *         description: Section filter.
 *       - in: query
 *         name: entry
 *         schema:
 *           type: string
 *         description: Entry filter.
 *     responses:
 *       '200':
 *         description: Successful response with profiles.
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
