/**
 * @swagger
 * tags:
 *   name: policy
 *   description: Home page
 */

/**
 * @swagger
 * /policy:
 *   get:
 *     summary: Get policies based on query parameters.
 *     tags: [policy]
 *     parameters:
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: string
 *         description: Policy key filter.
 *       - in: query
 *         name: protocol_type
 *         schema:
 *           type: string
 *         description: Protocol type filter.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name filter.
 *     responses:
 *       '200':
 *         description: Successful response with policies.
 *         content:
 *           application/json:
 *             example:
 *               policies:
 *                 - policies
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /policy:
 *   post:
 *     summary: Create a new policy.
 *     tags: [policy]
 *     parameters:
 *       - in: query
 *         name: protocol_type
 *         schema:
 *           type: string
 *         description: Protocol type filter.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name filter.
 *     responses:
 *       '200':
 *         description: Successful response with result and lastID.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               lastID: 123
 *       '500':
 *         description: Internal server error.
 */

/**
 /**
 * @swagger
 * /policy/{policy_key}:
 *   put:
 *     summary: Update a policy based on the provided policy key
 *     tags: [policy]
 *     description: Update a policy using the specified policy key and parameters.
 *     parameters:
 *       - in: path
 *         name: policy_key
 *         required: false
 *         schema:
 *           type: string
 *         description: The key of the policy to be updated.
 *       - in: query
 *         name: protocol_type
 *         required: false
 *         schema:
 *           type: string
 *         description: The type associated with the policy.
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: The name associated with the policy.
 *     responses:
 *       '200':
 *         description: Successfully updated the policy.
 *         content:
 *           application/json:
 *             example:
 *               result: true
 *               message: Successfully updated the policy.
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

/**
 * @swagger
 * /policy:
 *   delete:
 *     summary: delete a policy.
 *     tags: [policy]
 *     parameters:
 *       - in: query
 *         name: policy_key
 *         schema:
 *           type: string
 *         description: Policy Key filter.
 *     responses:
 *       '200':
 *         description: Successfully deleted the policy.
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
