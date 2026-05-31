import JsonLd from "@/components/seo/JsonLd";
import ContactPage from "@/components/contact/ContactPage";
import { webPageSchema } from "@/lib/jsonld";

export default function Contact() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/contact",
          title: "Contact | AWENE",
          description:
            "Écrivez-nous pour une question, une collaboration ou un premier échange autour de votre accompagnement.",
          type: "ContactPage",
        })}
      />
      <ContactPage locale="fr" />
    </>
  );
}
