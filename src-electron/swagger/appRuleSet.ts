/**
 * @swagger
 * tags:
 *   name: ruleset
 *   description: Home page
 */

/**
 * @swagger
 * /ruleset:
 *   get:
 *     summary: Get rulesets based on query parameters.
 *     tags: [ruleset]
 *     parameters:
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: string
 *         description: policy_key filter.
 *       - in: query
 *         name: dbcref_key
 *         schema:
 *           type: string
 *         description: dbcref_key filter.
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
