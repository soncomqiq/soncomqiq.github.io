(() => {
  const translations = [];
  const years = document.getElementById("experience-years-copy").textContent;
  const add = (selector, thaiCopy) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (thaiCopy[index] !== undefined) {
        translations.push({ element, en: element.innerHTML, th: thaiCopy[index] });
      }
    });
  };

  add(".nav-links a", ["เกี่ยวกับผม", "ผลงาน", "ประสบการณ์", "ทักษะ", "การศึกษา", "ติดต่อ"]);
  add(".hero h1", ['สวัสดีครับ ผม <span class="gradient">Nuttachai</span><br />สร้างระบบที่เติบโตไปกับธุรกิจ']);
  add(".hero-desc", [`Advanced Software Engineer ที่ KBTG มีประสบการณ์ <span id="experience-years-copy">${years}</span> ปี ในการออกแบบระบบประสิทธิภาพสูงด้วย Java, Spring Boot, Node และ React ทำงานอยู่ที่กรุงเทพฯ ประเทศไทย`]);
  add(".hero-cta .btn-primary", ["ติดต่อพูดคุย"]);
  add(".scroll-hint", ["เลื่อนลง"]);
  add(".section-title", ["เกี่ยวกับผม", "ผลงานที่คัดสรร", "ประสบการณ์ทำงาน", "ทักษะ", "การสอนและให้คำปรึกษา", "การศึกษาและงานวิจัย"]);
  add(".about-text p", [
    `ผมเป็นวิศวกรซอฟต์แวร์ มีประสบการณ์ <strong id="experience-years-about">${years.replace("+", "")} ปี</strong> ในการออกแบบและพัฒนาระบบด้วย <strong>Java, JavaScript, Node, React และ Spring Boot</strong>`,
    "ผมให้ความสำคัญกับคุณภาพของระบบและการทำงานร่วมกับทีม ตั้งแต่แพลตฟอร์มซื้อขายเงินตราระดับโลกที่ <strong>London Stock Exchange Group</strong> ไปจนถึงเครื่องมือสำหรับที่ปรึกษาทางการเงินที่ <strong>KBTG</strong>",
    "นอกจากงานพัฒนาซอฟต์แวร์ ผมยังสอนผู้เรียนมาแล้ว<strong>หลายร้อยคน</strong> และเรียนรู้สิ่งใหม่อยู่เสมอ ผมสำเร็จปริญญาโทสาขาวิศวกรรมคอมพิวเตอร์จากจุฬาลงกรณ์มหาวิทยาลัย และมีผลงานวิจัยตีพิมพ์ใน <em>PLOS ONE</em>",
  ]);
  add(".side-quests summary", ["ลองเล่นสนุก ๆ"]);
  add(".side-quests > p", ["เกมอาร์เคดเล็ก ๆ ที่ทำไว้ให้ลองเล่น"]);
  add(".projects-intro", ["ระบบหลังบ้านตัวอย่าง ออกแบบจากงานที่ธุรกิจไทยต้องจัดการในแต่ละวัน"]);
  add(".project h3", ["ร้านเย็นสบาย / Yen Sabai", "คลินิกใสสะอาด / Saisa-at Clinic"]);
  add(".project-content > p", [
    "ระบบจัดการร้านแอร์ เชื่อมงานขายหน้าร้านกับตารางงานบริการของช่าง",
    "ระบบจัดการคลินิกความงามและสปา รวมการจองคิว คอร์สของลูกค้า และงานขายหน้าร้านไว้ด้วยกัน",
  ]);
  add(".project-features li", ["ตารางงานช่าง", "คำสั่งซื้อและใบเสนอราคา", "สินค้าและสต็อก", "ตารางผู้ให้บริการและห้อง", "คอร์สและประวัติลูกค้า", "งานขายและใบเสร็จ"]);
  add(".project-demo", ["ลองใช้งานระบบ", "ลองใช้งานระบบ"]);
  add(".projects-note", ["ระบบตัวอย่าง ใช้ชื่อธุรกิจและข้อมูลสมมติทั้งหมด กรอกบัญชีทดลองไว้ให้แล้วที่หน้าเข้าสู่ระบบ"]);
  add(".stat-label", ["ปีของประสบการณ์", "ผู้เรียนที่เข้าถึง", "ผลงานวิจัย"]);
  add(".stat-tooltip b", ["รายละเอียดผู้เรียน"]);
  add(".stat-tooltip li", ["Buzzfreeze: สอนสดและในห้องเรียนกว่า 100 คน", "WeStride: ให้คำปรึกษาผู้เรียนออนไลน์กว่า 100 คน", "FutureSkill: ผู้เรียนออนไลน์กว่า 1,000 คน"]);
  add(".job .place", Array(5).fill("กรุงเทพฯ ประเทศไทย"));
  add(".job .badge-current", ["ปัจจุบัน"]);
  add(".job:first-child .job-period", ["2024.10 - ปัจจุบัน"]);
  add(".job li", [
    "ร่วมพัฒนาเครื่องมือภายในสำหรับที่ปรึกษาทางการเงิน",
    "ออกแบบและพัฒนาบริการใหม่ด้วยสถาปัตยกรรม Microservices เพื่อรองรับความต้องการของธุรกิจ",
    "ร่วมออกแบบระบบและเชื่อมต่อการทำงานระหว่างบริการต่าง ๆ",
    "ออกแบบ พัฒนา และดูแลแพลตฟอร์มอีคอมเมิร์ซรถยนต์ไฟฟ้า ด้วย Microservices, Spring Boot และ PostgreSQL",
    "แก้ปัญหาประสิทธิภาพที่สำคัญ ทั้งหน่วยความจำไม่พอระหว่างค้นฐานข้อมูลและการตอบสนองช้า",
    "พัฒนาและย้ายแพลตฟอร์มซื้อขายเงินตราระดับโลกจาก Java Applet ไปยัง Angular",
    "วางแผนและส่งมอบฟีเจอร์ใหม่ พร้อมวิเคราะห์ความเป็นไปได้ ประสิทธิภาพ และความเสี่ยง",
    "แก้ปัญหาประสิทธิภาพฝั่ง Backend และลดเวลาตอบสนองของระบบ",
    "พัฒนาและดูแล Microservices สำหรับแพลตฟอร์มส่งอาหาร ด้วย Spring Boot, MongoDB และ Elasticsearch",
    "จัดทำเอกสารขั้นตอนการพัฒนาและการทำงานของระบบ",
    "สอนผู้เรียนกว่า 100 คน ทั้งในห้องเรียนและผ่านการสอนสด ในหัวข้อ NodeJS, ReactJS และการออกแบบฐานข้อมูล",
    "จัดทำสไลด์ แบบทดสอบ และวิดีโอประกอบการเรียน",
    "ร่วมพัฒนาเว็บของบริษัท เพื่อปรับปรุงการทำงานและประสบการณ์ผู้ใช้",
  ]);
  add(".mentorship-intro", ["ประสบการณ์สอนที่ Buzzfreeze และ FutureSkill รวมถึงงานให้คำปรึกษานอกเวลาที่ WeStride ซึ่งยังทำอยู่ในปัจจุบัน"]);
  add(".mentorship-card .card-tag", ["นอกเวลา / ธ.ค. 2023 - ปัจจุบัน", "ฟรีแลนซ์ / ม.ค. 2023 - มิ.ย. 2023"]);
  add(".mentorship-card .badge-current", ["ยังทำอยู่"]);
  add(".mentorship-card h3", ["ผู้ให้คำปรึกษาด้านการเรียน", "ผู้สอนหลักสูตร"]);
  add(".mentorship-card .place", ["กรุงเทพฯ ประเทศไทย / Hybrid", "กรุงเทพฯ ประเทศไทย / Hybrid"]);
  add(".mentorship-card > p", [
    "ให้คำปรึกษาผู้เรียนนอกเวลางาน ผ่านการสอนสด วิดีโอบทเรียน และคำแนะนำเชิงปฏิบัติในหัวข้อวิศวกรรมซอฟต์แวร์",
    "สอน React ทั้งออนไลน์และในสถานที่ โดยเชื่อมการฝึกปฏิบัติเข้ากับประสบการณ์พัฒนาระบบจริง",
  ]);
  add(".mentorship-card li", [
    "ให้คำปรึกษาผู้เรียนออนไลน์กว่า 100 คน ผ่านการสอนสดและการแก้โจทย์ทางเทคนิค",
    "บันทึกวิดีโอและสร้างสื่อการสอน เพื่อทำให้หัวข้อที่ซับซ้อนเข้าใจง่ายขึ้น",
    "นำประสบการณ์จาก Buzzfreeze และ FutureSkill มาปรับบทเรียนให้เข้าถึงง่ายและใช้ได้จริง",
    "เข้าถึงผู้เรียนออนไลน์กว่า 1,000 คน ผ่านหลักสูตร React สำหรับพัฒนา Frontend",
    "เป็นผู้สอนนอกเวลาในสถานที่ให้ KBTG ในหลักสูตร React และ Spring Boot",
  ]);
  add("#education .card-tag", ["ปริญญาโท / 2020 - 2023", "ปริญญาตรี / 2015 - 2019", "ผลงานตีพิมพ์ / PLOS ONE, 2023", "งานวิจัย / ส่งพิจารณาตีพิมพ์"]);
  add("#education .card h3", ["วิศวกรรมศาสตรมหาบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์", "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์"]);
  add("#education .card > p", ["จุฬาลงกรณ์มหาวิทยาลัย กรุงเทพฯ", "จุฬาลงกรณ์มหาวิทยาลัย กรุงเทพฯ"]);
  add(".contact h2", ['มาสร้าง<span style="color:var(--accent)">ระบบที่ตอบโจทย์</span>ไปด้วยกัน']);
  add(".contact > p", ["กำลังมองหาคนพัฒนาเว็บหรือระบบหลังบ้าน มีตำแหน่งงานที่อยากคุย หรืออยากแลกเปลี่ยนเรื่อง Microservices ติดต่อผมได้ครับ"]);

  const attributes = [];
  const addAttribute = (selector, name, thaiCopy) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      attributes.push({ element, name, en: element.getAttribute(name), th: thaiCopy[index] });
    });
  };
  addAttribute(".project-preview, .project-demo", "aria-label", ["ลองใช้งานร้านเย็นสบาย (เปิดแท็บใหม่)", "ลองใช้งานร้านเย็นสบาย (เปิดแท็บใหม่)", "ลองใช้งานคลินิกใสสะอาด (เปิดแท็บใหม่)", "ลองใช้งานคลินิกใสสะอาด (เปิดแท็บใหม่)"]);
  addAttribute(".project-preview img", "alt", ["ตารางงานช่างรายสัปดาห์ของร้านเย็นสบาย แยกตามช่างและวัน", "ปฏิทินนัดหมายคลินิกใสสะอาด แยกตามผู้ให้บริการและเวลา"]);
  addAttribute("#learners-stat-card", "aria-label", ["จำนวนผู้เรียน คลิกเพื่อดูรายละเอียด"]);

  const setLanguage = (language) => {
    document.documentElement.lang = language;
    translations.forEach(({ element, en, th }) => { element.innerHTML = language === "th" ? th : en; });
    attributes.forEach(({ element, name, en, th }) => { element.setAttribute(name, language === "th" ? th : en); });
    document.querySelectorAll("[data-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    document.title = language === "th" ? "Nuttachai Kulthammanit | วิศวกรซอฟต์แวร์" : "Nuttachai Kulthammanit — Software Engineer";
    try { localStorage.setItem("portfolio-language", language); } catch {}
    window.dispatchEvent(new Event("portfolio-language-change"));
  };

  document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  let savedLanguage = "en";
  try { savedLanguage = localStorage.getItem("portfolio-language") || "en"; } catch {}
  setLanguage(savedLanguage === "th" ? "th" : "en");
})();