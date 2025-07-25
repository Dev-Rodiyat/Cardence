import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    FaLink,
    FaDownload,
    FaPrint,
    FaEdit,
    FaArrowLeft,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBuilding,
    FaBriefcase,
    FaQrcode
} from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';

const LOCAL_KEY = 'cardence-cards';

const CardDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const cardRef = useRef(null);
    const isDark = document.documentElement.classList.contains('dark');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        const found = stored.find((item) => item.id === id);
        if (found) {
            setCard(found);
        } else {
            navigate('/my-cards');
        }
    }, [id, navigate]);

    const handleDownload = async () => {
        const canvas = await html2canvas(cardRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${card.name || 'card'}.pdf`);
    };

    const qrRef = useRef(null);

    const handleDownloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${card.name || 'card'}-qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handlePrint = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                useCORS: true, // helps if your card has images like avatars
            });
            const dataUrl = canvas.toDataURL('image/png');

            const printWindow = window.open('', '_blank', 'width=800,height=600');
            if (!printWindow) {
                alert("Popup blocked. Please allow popups for this site.");
                return;
            }

            printWindow.document.write(`
            <html>
                <head>
                    <title>${card.name}'s Card</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 20px;
                            background: white;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                    </style>
                </head>
                <body>
                    <img src="${dataUrl}" />
                </body>
            </html>
        `);

            printWindow.document.close();

            // Wait for content to load, then print
            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
            };
        } catch (error) {
            console.error("Error printing card:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const isValidLink = (link) => {
        try {
            if (!link || typeof link !== "string" || !link.trim()) return false;
            const url = new URL(link.trim());
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    };

    if (!card) return null;

    return (
        <section className="pt-32 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/my-cards')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <FaArrowLeft className="text-base" />
                        Back
                    </button>

                    {/* Action Icons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            title="Download as PDF"
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <FaDownload className="text-lg" />
                        </button>
                        <button
                            onClick={handlePrint}
                            title="Print card"
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <FaPrint className="text-lg" />
                        </button>
                        <button
                            onClick={handleEdit}
                            title="Edit card"
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <FaEdit className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Card */}
                <div
                    ref={cardRef}
                    className="relative mx-auto bg-white/90 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl p-8 max-w-md text-center space-y-4"
                >
                    {/* Avatar */}
                    {card.avatar ? (
                        <img
                            src={card.avatar}
                            alt={card.name}
                            className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-700"
                        />
                    ) : (
                        <div className="w-28 h-28 mx-auto rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-4xl text-gray-500">
                            ?
                        </div>
                    )}

                    {/* Identity */}
                    <div className='space-y-1'>
                        <h2 className="text-2xl font-bold">{card.name}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{card.position} @ {card.company}</p>
                    </div>

                    {/* Bio */}
                    {card.bio && <p className="text-sm text-gray-700 dark:text-gray-300">{card.bio}</p>}

                    {/* Contact Info */}
                    <div className="text-sm text-left space-y-2 mt-4">
                        {card.email && (
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                                <span>{card.email}</span>
                            </div>
                        )}
                        {card.phone && (
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-gray-500 dark:text-gray-400" />
                                <span>{card.phone}</span>
                            </div>
                        )}
                        {card.location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                                <span>{card.location}</span>
                            </div>
                        )}
                        {card.company && (
                            <div className="flex items-center gap-2">
                                <FaBuilding className="text-gray-500 dark:text-gray-400" />
                                <span>{card.company}</span>
                            </div>
                        )}
                        {card.position && (
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="text-gray-500 dark:text-gray-400" />
                                <span>{card.position}</span>
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    {Array.isArray(card.links) && card.links.some(link => isValidLink(link)) && (
                        <div className="mt-6">
                            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Links</h3>
                            <ul className="flex flex-wrap justify-center gap-3 text-sm">
                                {card.links
                                    .filter(isValidLink)
                                    .map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                            >
                                                <FaLink className="text-xs" />
                                                {link.replace(/^https?:\/\//, '').slice(0, 30)}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    <div className="mt-6 text-center flex flex-col items-center gap-2">
                        <div ref={qrRef} className="inline-block p-3 bg-white rounded shadow dark:bg-gray-100">
                            <QRCodeCanvas
                                value={window.location.href}
                                size={128}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                                includeMargin={true}
                            />
                        </div>

                        <button
                            onClick={handleDownloadQR}
                            className="mt-2 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            <FaQrcode />
                            Download QR Code
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardDetails;
