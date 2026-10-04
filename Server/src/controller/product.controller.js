export const createProduct = (req, res) => {
    console.log(req.files);
    console.log(req.body);

    res.status(200).json({
        Message : "Successful"
    })
}