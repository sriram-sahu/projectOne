import React from "react";
import {
  BarChart,
  Tooltip,
  Cell,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
//import "./index.css";

const COLORS = ["#8884d8", "#82ca9d", "#AF19FF", "#FF8042", "#FFBB28"];

const PdfContent = ({ streamsContent, data }) => {
  const BarchartData = [
    {
      name: "Commerce",
      score: data.commerce_score,
    },
    {
      name: "Humanities",
      score: data.humanities_score,
    },
    {
      name: "Science (Bio)",
      score: data.science_bio_score,
    },
    {
      name: "Science (Math)",
      score: data.science_math_score,
    },
  ];
  BarchartData.sort((a, b) => b.score - a.score);

  return (
    <div className="p-4">
      <div className="pdf-header">
        {/* logo and after clicking this logo, it'll navigates to home route*/}
        <div className="">
          <img
            src="https://res.cloudinary.com/de5cu0mab/image/upload/v1688971136/Logo_Final_uovjgi.png"
            alt="logo"
            className="logo"
            style={{ height: "90px", width: "140px", marginLeft: "23px" }}
          />
          <br />
        </div>
        <h1 style={{ alignSelf: "center" }}>
          <b>Study Global</b>
        </h1>
        <div style={{ alignSelf: "center" }}>
          <p>
            <b>Email : </b>jivanishahina@gmail.com
            <br />
            <b>Phone : </b>9999999999
          </p>
        </div>
      </div>
      <a target="_blank" href="https://www.overseaseducation.net">
        www.overseaseducation.net
      </a>

      <hr style={{ height: "2px" }} />
      <div style={{ "page-break-after": "always" }}>
        <h1 className="text-center pb-5">Stream Recommendation Test Report</h1>
        <p className="">
          Selecting a suitable career is the first step for a successful life
          ahead. Career selection can be quiet a challenging task as one is
          surrounded by a plethora of choices at their disposal.
        </p>
        <p>
          Therefore, it is imperative that the student progresses gradually and
          takes the first step towards their career selection; that is,
          selecting a suitable stream for themselves based on their aptitude and
          interest.
        </p>
        <p>
          The stream recommendation test becomes crucial as it helps to clear
          the ambiguity and confusion and provides a certainty of an option or a
          choice of options that would best suit the student’s personality.
        </p>
        <p>
          It also helps to weigh correctly all the choices that are currently
          present in the career fields thus enabling a student to prepare
          themselves with confidence and clarity.
        </p>
        <br />

        <div>
          <table border="2px">
            <thead>
              <tr>
                <th>Stream</th>
                <th>Aptitude</th>
                <th>Interest</th>
              </tr>
            </thead>
            <tbody>
              {streamsContent.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>
                    {item[1] >= 0 && item[1] < 2
                      ? "Low"
                      : item[1] > 1 && item[1] < 4
                      ? "Medium"
                      : "High"}
                  </td>
                  <td>
                    {item[2] >= 0 && item[2] < 6
                      ? "Low"
                      : item[2] > 5 && item[2] < 11
                      ? "Medium"
                      : "High"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>
          <b>Student Stream Recommendation Rank:</b>
        </h5>
        <div
          className="barchart-table-container"
          style={{ marginLeft: "160px" }}
        >
          {/* bar chart of all streams total scores of stream recommendation test */}
          <div className="barchart">
            <BarChart
              width={450}
              height={300}
              data={BarchartData}
              margin={{
                top: 30,
                right: 0,
                left: 50,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
              <Bar dataKey="score" fill="green" barSize={30}>
                {BarchartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                ))}
              </Bar>
              <XAxis
                dataKey="name"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              />
              {/* <YAxis
              type="number"
              style={{ fontSize: "15px", fontWeight: "bold" }}
              domain={[0, 20]}
            /> */}
            </BarChart>
          </div>
        </div>
        <br />
        <p>
          @{new Date().getFullYear()} Study Global OverSeas Education Consultants. All right reserved.
        </p>
      </div>
      <div style={{ "page-break-after": "always" }}>
        <br />
        <br />
        <br />
        <p>
          Stream recommendation rankings are based on order of preference; where
          first is the most preferred stream for the student based on their
          aptitude and interest and fourth is the least preferred.
        </p>
        <p>
          Aptitude is a natural ability of an individual. It is an inclination
          that is unaffected by interest. Though innate, it can still be
          developed by education and training.
        </p>
        <p>
          Interest on the other hand, is a feeling because of which we tend to
          give more attention to a particular subject or thing. This can change
          with changes in our external environment or surroundings.
        </p>
        <p>
          When deciding on a particular stream, it is important that we give
          equal importance and weightage to these factors, aptitude and
          interest. As only then a foundation to a successful career can be
          laid.
        </p>
        <p>
          Considering just one and ignoring the other, may result in a career
          choice that may not be sustainable for a lifetime.
        </p>
        <b>Example:</b>
        <p>
          If an individual selects a career where their aptitude is high but
          their interest levels are not very high or low, then there is a
          probability that they will find the tasks assigned to them
          uninteresting and so they will not be self motivated to continue such
          a career for a long time.
        </p>
        <p>
          Likewise, if they choose a career where their interest are high but
          their aptitude levels are not very high or low, then again there is a
          possibility that they may find the tasks assigned to them as very
          challenging which can impact their morale leading to less job
          satisfaction.
        </p>
        <p>
          No matter which stream you opt for, success is always possible if you
          put in your best effort by hard work, dedication and being consistent
          in what you do.
        </p>
        <br />
        <br />
        <br />

        <p
          style={{
            fontFamily: "Your Italic Font, sans-serif",
            fontStyle: "italic",
          }}
        >
          <b>Remember:</b> “You can always edit a bad page. You can’t edit a
          blank page&quot;
        </p>
        <p
          style={{
            fontFamily: "Your Italic Font, sans-serif",
            fontStyle: "italic",
          }}
          className="text-end"
        >
          - Jodi Picoult
        </p>
        <p>
          The recommendation provided in the report should be taken as a guide
          to help you decide on your selection of stream. It should be seen as a
          stepping stone and not final and binding.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>
          @{new Date().getFullYear()} Study Global OverSeas Education Consultants. All right reserved.
        </p>
      </div>
      {/* <br />
      <br />
      <br />
      <br /> */}
      <br />
      <br />
      <br />
      <br />
      <div style={{ "page-break-after": "always" }}>
        <h2>Popular Courses after 12 th :</h2>
        <br />

        <h4 className="text-center">
          <b>Commerce:</b>
        </h4>
        <br />
        <div className="">
          <table border="2px">
            <tbody>
              <tr>
                <td>B.COM</td>
                <td>Cost Accountant</td>
              </tr>
              <tr>
                <td>Business Administration(BBA)</td>
                <td>Chartered Accountant(CA)</td>
              </tr>
              <tr>
                <td>Business Management(BBM)</td>
                <td>
                  Architecture(12<sup>th</sup> with Math)
                </td>
              </tr>
              <tr>
                <td>Management Studies (BMS)</td>
                <td>Bachelor of Computer Application (BCA)-Math preferred</td>
              </tr>
              <tr>
                <td>Company Secretary(CS)</td>
                <td>
                  B.SC (12 <sup>th</sup> with math) <br />
                  a. I.T <br />
                  b. Economics
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <h4 className="text-center">
          <b>PCB/Science(Bio):</b>
        </h4>
        <br />
        <div className="">
          <table border="2px">
            <tbody>
              <tr>
                <td>BSC-Physics</td>
                <td>Dentist(BDS)</td>
                <td>Pharmacy</td>
                <td>ENGINEERING-Bio Technology</td>
              </tr>
              <tr>
                <td>BSC-Chemistry</td>
                <td>MBBS</td>
                <td>Nursing</td>
                <td>ENGINEERING-Bio Medical</td>
              </tr>
              <tr>
                <td>BSC-Agriculture</td>
                <td>Veterinary Science & Animal Husbandry</td>
                <td>Physiotherapy</td>
                <td>ENGINEERING-Agriculture</td>
              </tr>
              <tr>
                <td>BSC-Life Science</td>
                <td>Homeopathy(BHMS)</td>
                <td>Lab Technology</td>
                <td></td>
              </tr>
              <tr>
                <td>BSC-Botany</td>
                <td>Ayurvedic Medicine(BAMS)</td>
                <td>Prosthetic & Orthotics technology</td>
              </tr>
              <tr>
                <td>BSC-Zoology</td>
                <td>Unani Medicine (BUMS)</td>
                <td>Occupational Therapy</td>
                <td></td>
              </tr>
              <tr>
                <td>BSC-Microbiology</td>
                <td></td>
                <td>Audiology & Speech language Pathology</td>
                <td></td>
              </tr>
              <tr>
                <td>BSC-Forestry</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <br />
        <p>
          @{new Date().getFullYear()} Study Global OverSeas Education Consultants. All right reserved.
        </p>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div style={{ "page-break-after": "always" }}>
        <h4 className="text-center">
          <b>PCM/Science(Math):</b>
        </h4>
        <br />
        <div className="">
          <table border="2px">
            <tbody>
              <tr>
                <td>ENGINEERING-Mechanical</td>
                <td>NATIONAL DEFENCE ACADEMY(NDA)-Army</td>
              </tr>
              <td>ENGINEERING-Chemical</td>
              <td>NATIONAL DEFENCE ACADEMY(NDA)-Navy</td>
              <tr>
                <td>ENGINEERING-Aeronautical</td>
                <td>NATIONAL DEFENCE ACADEMY(NDA)-Air force</td>
              </tr>
              <tr>
                <td>ENGINEERING-Automobile</td>
                <td>Bachelor of Computer Application (BCA)</td>
              </tr>
              <tr>
                <td>ENGINEERING-Bio Technology</td>
                <td>B.SC Physics </td>
              </tr>
              <tr>
                <td>ENGINEERING-industrial</td>
                <td>B.SC Chemistry </td>
              </tr>
              <tr>
                <td>ENGINEERING-Marine</td>
                <td>B.SC Metallurgy </td>
              </tr>
              <tr>
                <td>ENGINEERING-Mining</td>
                <td>B.SC Math/Computer </td>
              </tr>
              <tr>
                <td>Nautical Science</td>
                <td>Architecture</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />

        <h4 className="text-center">
          <b>Humanities (ARTS):</b>
        </h4>
        <br />
        <div className="">
          <table border="2px">
            <tbody>
              <tr>
                <td>Business Administration(BBA)</td>
                <td>Teaching</td>
              </tr>
              <td>Business Management(BBM)</td>
              <td>Hotal Management</td>
              <tr>
                <td>Law (LLB)</td>
                <td>Tourism</td>
              </tr>
              <tr>
                <td>BA-Philosophy</td>
                <td>Fine Arts</td>
              </tr>
              <tr>
                <td>BA-Economics</td>
                <td>Journalism</td>
              </tr>
              <tr>
                <td>BA-Psychology</td>
                <td>Film Making</td>
              </tr>
              <tr>
                <td>BA-English language</td>
                <td>Advertising </td>
              </tr>
              <tr>
                <td>BA-Foreign language</td>
                <td>Photography </td>
              </tr>
              <tr>
                <td>BA-political Science</td>
                <td>Animation</td>
              </tr>
              <tr>
                <td>BA-Social Science</td>
                <td>Media Study</td>
              </tr>
              <tr>
                <td>BA-History</td>
                <td>Bachelor of Design (B.Des)-Fashion Design</td>
              </tr>
              <tr>
                <td>BA-Geography</td>
                <td>Bachelor of Design (B.Des)-Interior design</td>
              </tr>
              <tr>
                <td>Architecture (12 Th with Math)</td>
                <td>Bachelor of Design (B.Des)-Jewellery Design </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <p>
          @{new Date().getFullYear()} Study Global OverSeas Education Consultants. All right reserved.
        </p>
      </div>
      <br />
      <br />
      <br />
      <div style={{ "page-break-after": "always" }}>
        <h4 className="text-center">
          <b>Courses That Can be Pursued from all Streams:</b>
        </h4>
        <br />

        <div className="">
          <table border="2px">
            <tbody>
              <tr>
                <td>Business Administration(BBA)</td>
                <td>Journalism</td>
              </tr>
              <td>Business Management(BBM)</td>
              <td>Film Making</td>
              <tr>
                <td>Law (LLB)</td>
                <td>Advertising</td>
              </tr>
              <tr>
                <td>Hotel Management</td>
                <td>Animation</td>
              </tr>
              <tr>
                <td>Tourism</td>
                <td>Photography</td>
              </tr>
              <tr>
                <td>Teaching</td>
                <td>Media Study</td>
              </tr>

              <tr>
                <td>BA-History</td>
                <td>Bachelor of Design (B.Des)-Fashion Design</td>
              </tr>
              <tr>
                <td>BA-Geography</td>
                <td>Bachelor of Design (B.Des)-Interior design</td>
              </tr>
              <tr>
                <td>Architecture (12 Th with Math)</td>
                <td>Bachelor of Design (B.Des)-Jewellery Design </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />

        <p style={{ marginTop: "595px" }}>
          @{new Date().getFullYear()} Study Global OverSeas Education Consultants. All right reserved.
        </p>
      </div>
    </div>
  );
};

export default PdfContent;