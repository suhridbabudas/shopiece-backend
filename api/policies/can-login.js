module.exports = async function (req, res, proceed) {
    const { Email } = req.allParams();
    try {
        const user = await Users.findOne({ Email: Email });
        if (!user) {
            res.status(404).json({
                error: `${Email} does not belong to a user`,
            });
        } else if (user.EmailStatus === 'unconfirmed') {
            res.status(401).json({
                error: 'This account has not been confirmed. Click on the link in the email sent to you to confirm.',
            });
        } else {
            return proceed();
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};