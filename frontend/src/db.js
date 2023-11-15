const specs = {
	motherboards: { socket: "", chipset: "", memoryType: "" },
	processors: {
		line: "",
		model: "",
		socket: "",
		core: "",
		totalCores: "",
		totalThreads: "",
		performanceCores: "",
		efficientCores: "",
		maxTurboFrequency: "",
		TDP: "",
	},
	videocards: {
		developer: "", // NVIDIA, AMD
		series: "",
		memory: "",
		memoryType: "",
		videoMemoryFrequency: "",
		gpuBoostFrequency: "",
		TGP: "",
	},
	monitors: {
		curvedScreen: "",
		panelSize: "",
		panelType: "",
		trueResolution: "",
		aspectRatio: "",
		responseTime: "",
		displayColors: "",
		bitRate: "",
		refreshRate: "",
		hdr: "",
		freeSync: "",
		gSync: "",
		powerConsumption: "",
	},
	keyboards: { type: "", connectionType: "", switchesType: "" },
	mouses: { connectionType: "", wirelessType: "", sensorResolution: "" },
	serverMotherboards: {
		socket: "",
		chipset: "",
		numberOfCoresSupported: "",
		numberOfSockets: "",
		memoryType: "",
		memorySlots: "",
		maximumMemoryCapacity: "",
		MTP: "",
	},
	serverProcessors: {
		line: "",
		socket: "",
		core: "",
		totalCores: "",
		totalThreads: "",
		maxTurboFrequency: "",
		maximumMemoryCapacity: "",
		memoryChannels: "",
		TDP: "",
	},
	serverDrives: { formFactor: "", interface: "", storageCapacity: "", speed: "" },
};

const products = {
	motherboards: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.motherboards,
			images: [],
			comments: [],
		},
	],
	processors: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.processors,
			images: [],
			comments: [],
		},
	],
	videocards: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.videocards,
			images: [],
			comments: [],
		},
	],
	monitors: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.monitors,
			images: [],
			comments: [],
		},
	],
	keyboards: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.keyboards,
			images: [],
			comments: [],
		},
	],
	mouses: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.mouses,
			images: [],
			comments: [],
		},
	],
	serverMotherboards: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.serverMotherboards,
			images: [],
			comments: [],
		},
	],
	serverProcessors: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.serverProcessors,
			images: [],
			comments: [],
		},
	],
	serverDrives: [
		{
			_id: 1,
			title: "",
			vendor: "",
			codeVendor: "",
			previewImage: "",
			price: "",
			specs: specs.serverDrives,
			images: [],
			comments: [],
		},
	],
};

const subcategories = {
	pcComponents: [
		{
			_id: "1",
			title: "Материнские платы",
			products: products.motherboards,
		},
		{
			_id: "2",
			title: "Процессоры",
			products: products.processors,
		},
		{
			_id: "3",
			title: "Видеокарты",
			products: products.videocards,
		},
	],
	periphery: [
		{
			_id: "1",
			title: "Мониторы",
			products: products.monitors,
		},
		{
			_id: "2",
			title: "Клавиатуры",
			products: products.keyboards,
		},
		{
			_id: "3",
			title: "Мыши",
			products: products.mouses,
		},
	],
	serverEquipment: [
		{
			_id: "1",
			title: "Серверные материнские платы",
			products: products.serverMotherboards,
		},
		{
			_id: "2",
			title: "Серверные процессоры",
			products: products.serverProcessors,
		},
		{
			_id: "3",
			title: "Серверные накопители",
			products: products.serverDrives,
		},
	],
};

const categories = [
	{
		_id: "1",
		title: "Комплектующие для ПК",
		subcategories: subcategories.pcComponents,
	},
	{
		_id: "2",
		title: "Периферия",
		subcategories: subcategories.periphery,
	},
	{
		_id: "3",
		title: "Серверное оборудование",
		subcategories: subcategories.serverEquipment,
	},
];

export const catalog = {
	title: "Каталог товаров",
	categories,
};

// ---------------------------------- MODELS ------------------------------------
const mongoose = {};
const validator = {};

const ProductSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	vendor: {
		type: String,
		required: true,
	},
	codeVendor: {
		type: String,
		required: true,
	},
	previewImage: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: "Изображение должно быть с действительным URL-адресом",
		},
	},
	price: {
		type: String,
		required: true,
	},
	specs: [],
	images: [
		{
			type: String,
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = {
	Product,
};

//-------------------------------------------------------------------------------

const SubcategorySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
module.exports = {
	Subcategory,
};

//-------------------------------------------------------------------------------

const CategorySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	subcategories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subcategory",
		},
	],
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = {
	Category,
};

//-------------------------------------------------------------------------------

const CatalogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
	],
});

const Catalog = mongoose.model("Catalog", CatalogSchema);
module.exports = {
	Catalog,
};
