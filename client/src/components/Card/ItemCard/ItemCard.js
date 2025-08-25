import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';

// Use environment variable for backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const ItemCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cartItemsContext = useContext(CartItemsContext);
    const wishItemsContext = useContext(WishItemsContext);

    if (!item) return null; // Don't render if item is undefined

    const handleAddToWishList = () => {
        if (wishItemsContext?.addItem) wishItemsContext.addItem(item);
    }

    const handleAddToCart = () => {
        if (cartItemsContext?.addItem) cartItemsContext.addItem(item, 1);
    }

    // Choose images safely
    const mainImage = item?.image?.[0]?.filename || "placeholder.jpg";
    const hoverImage = item?.image?.[1]?.filename || mainImage;

    // Construct image URL safely
    const imageUrl = `${BACKEND_URL}/public/${item?.category || "default"}/${isHovered ? hoverImage : mainImage}`;

    return (
        <div className="product__card__card">
            <div className="product__card">
                <div
                    className="product__image"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={imageUrl}
                        alt={item?.name || "item"}
                        className="product__img"
                        onError={(e) => { e.target.src = "/placeholder.jpg"; }} // fallback image
                    />
                </div>
                <div className="product__card__detail">
                    <div className="product__name">
                        <Link to={`/item/${item?.category || "default"}/${item?._id || ""}`}>
                            {item?.name || "Unnamed Item"}
                        </Link>
                    </div>
                    <div className="product__description">
                        <span>{item?.description || "No description available."}</span>
                    </div>
                    <div className="product__price">
                        <span>${item?.price?.toFixed(2) || "0.00"}</span>
                    </div>
                    <div className="product__card__action">
                        <IconButton
                            onClick={handleAddToWishList}
                            sx={{ borderRadius: '20px', width: '40px', height: '40px' }}
                        >
                            <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                        </IconButton>
                        <IconButton
                            onClick={handleAddToCart}
                            sx={{ borderRadius: '20px', width: '40px', height: '40px' }}
                        >
                            <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
