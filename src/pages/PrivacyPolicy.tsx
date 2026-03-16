import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-8">Privacy Policy</h1>
          <div className="w-16 h-px bg-primary mb-12" />
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg font-light leading-relaxed">
              <strong className="text-foreground">Effective Date:</strong> January 1, 2025
            </p>
            
            <p className="font-light leading-relaxed">
              Zolara Holdings Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">1. Information We Collect</h2>
              <p className="font-light leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you contact us or express interest in our services. This may include your name, email address, phone number, and any other information you choose to provide.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">2. Use of Your Information</h2>
              <p className="font-light leading-relaxed">
                We use the information we collect to respond to your inquiries, provide services, improve our website, and communicate with you about business opportunities or updates relevant to our operations.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">3. Disclosure of Your Information</h2>
              <p className="font-light leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with trusted third parties who assist us in operating our website or conducting our business, provided they agree to keep this information confidential.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">4. Security of Your Information</h2>
              <p className="font-light leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">5. Third-Party Websites</h2>
              <p className="font-light leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">6. Changes to This Policy</h2>
              <p className="font-light leading-relaxed">
                We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">7. Contact Us</h2>
              <p className="font-light leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:<br />
                <span className="text-primary">info@zolaraholdings.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
