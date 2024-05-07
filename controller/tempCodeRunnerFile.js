      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getCartBuy = async(req, res, next) => {
  let user = await Users.findOne({ _id: req.user.id }).populate('cart.id');
  
}