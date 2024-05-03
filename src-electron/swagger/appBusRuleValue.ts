/**
 * @swagger
 * tags:
 *   name: busrulevalue
 *   description: Home page
 */

/**
 * @swagger
 * /busrulevalue:
 *   get:
 *     summary: Get busrulevalues based on query parameters.
 *     tags: [busrulevalue]
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
 *         description: Successful response with busrules.
 *         content:
 *           application/json:
 *             example:
 *               busrules:
 *                 - busrules
 *                 - row_count
 *                 - message
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /busrulevalue:
 *   post:
 *     summary: Create a new busrule.
 *     tags: [busrulevalue]
 *     parameters:
 *       - in: body
 *         name: busrulevalues
 *         schema:
 *           type: post
 *         description: busrulevalues filter.
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

/**
 * @swagger
 * /busrulevalue/set:
 *   post:
 *     summary: Create a new busrule.
 *     tags: [busrulevalue]
 *     parameters:
 *       - in: body
 *         name: busrulevalues
 *         schema:
 *           type: post
 *         description: busrulevalues filter.
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

/**
 * @swagger
 * /busrulevalue:
 *   delete:
 *     summary: delete a busrule.
 *     tags: [busrulevalue]
 *     parameters:
 *       - in: query
 *         name: busrulevalue_key
 *         schema:
 *           type: number
 *         description: busrule_key filter.
 *     responses:
 *       '200':
 *         description: Successfully deleted the busrules.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: Successfully deleted the policy.
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
