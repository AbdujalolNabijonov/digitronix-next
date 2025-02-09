export const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export const serverApi = process.env.REACT_APP_API_URL

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
	error6: "Successfully log out!",
	error7: "You can not like yourself",
	error8: "You can not upload more than 5 images",
	warn1: "You are blocked, Contact with admin",
	success1: "Youa are successfully log in!",
	success2: "Sucessfully commented!",
	success3: "You subscribed user!",
	success4: "You unsubscribed user!",
	comment_err1: "Insert comment input!",
	comment_err2: "Choose rank you like!",
};


export const faqList = [
	[
		{ question: "What is this platform about?", answer: "This platform is a B2B marketplace where clients can purchase computer-related devices directly from product owners." },
		{ question: "Who can use this platform?", answer: "Businesses, retailers, and wholesalers looking to buy computer devices in bulk can use this platform to connect with suppliers." },
		{ question: "How do I create an account?", answer: "Click on the 'Sign Up' button and fill in the required details to register as a buyer or seller." },
		{ question: "Is this platform available globally?", answer: "Currently, we operate in select regions. Please check our terms for availability in your country." }
	],
	[
		{ question: "What services does this platform offer?", answer: "We provide a marketplace for businesses to connect, negotiate, and purchase computer-related devices from verified sellers." },
		{ question: "Do you offer customer support?", answer: "Yes, our customer support team is available via email and chat to assist with any inquiries." },
		{ question: "Can I request a product that is not listed?", answer: "Yes, you can submit a request for a specific product, and we will notify suppliers who might have it." },
		{ question: "Do you offer financing or installment payment options?", answer: "We do not provide financing directly, but some sellers may offer payment plans." }
	],
	[
		{ question: "How do I purchase a product?", answer: "To buy a product, contact the seller directly via the platform to discuss pricing, quantity, and shipping details." },
		{ question: "Are there bulk discounts?", answer: "Many sellers offer bulk discounts. Contact the seller to negotiate pricing for large orders." },
		{ question: "How can I ensure product quality?", answer: "We verify sellers, and you can check ratings, reviews, and certifications before purchasing." },
		{ question: "What payment methods are supported?", answer: "Sellers may accept bank transfers, PayPal, or other methods. Check with individual sellers for options." }
	],
	[
		{ question: "How can I participate in the community?", answer: "Join discussions, ask questions, and share insights in our forums and business networking sections." },
		{ question: "Can I rate and review sellers?", answer: "Yes, buyers can leave reviews and ratings to help other businesses make informed decisions." },
		{ question: "Are there industry events or webinars?", answer: "Yes, we regularly host webinars and networking events. Stay updated by subscribing to our newsletter." },
		{ question: "How do I report fraudulent activity?", answer: "Use the 'Report' button on a seller’s profile or contact our support team." }
	],
	[
		{ question: "How do I contact customer support?", answer: "You can reach us via email, live chat, or our contact form on the website." },
		{ question: "What are your customer service hours?", answer: "Our support team is available Monday to Friday, 9 AM - 6 PM (UTC)." },
		{ question: "Where is your headquarters located?", answer: "Our headquarters is located in [Your Location]. Check our 'About Us' page for more details." },
		{ question: "How can I provide feedback?", answer: "We value your input! Use the feedback form on our website to share your suggestions." }
	],
	[
		{ question: "How do I become a seller on this platform?", answer: "Sign up as a seller, verify your business, and list your products following our guidelines." },
		{ question: "Are there any fees for listing products?", answer: "Listing is free, but we charge a commission on successful transactions." },
		{ question: "How does shipping work?", answer: "Sellers handle shipping directly. Buyers and sellers should discuss shipping terms before completing a transaction." },
		{ question: "Can I integrate my existing e-commerce store?", answer: "Yes, we offer integrations with major e-commerce platforms. Contact us for setup assistance." }
	]
];