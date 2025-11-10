import { Doctor, DoctorPatient, Line, ModalLine, Shape } from "@/core/images";
import Button from "@/shared/ui/Button";
import LayoutContainer from "@/shared/ui/LayoutContainer";

const Hero = () => {
  return (
    <LayoutContainer>
      <div className="flex flex-col items-center justify-center mt-24 gap-4">
        <div className="relative">
          <h1 className="max-w-[800px] text-center md:text-[60px] text-[40px] text-gray-800">
            "Doğrulanmış, birinci sınıf ilaçlarla sağlığınızı en iyi şekilde
            destekleyin"
          </h1>
          <img
            src={Line}
            alt="line"
            className="absolute top-0 -z-10 opacity-45"
          />
        </div>
        <p className="max-w-lg text-center text-xl text-gray-500">
          Sağlıklı yaşam yolculuğunuzun kontrolünü elinize alın. Platformumuz,
          hak ettiğiniz sağlık hizmetlerini sunar.
        </p>
        <img
          src={Shape}
          alt="shape"
          className="absolute opacity-40 -z-10 right-0 top-0 md:block hidden"
        />
        <img
          src={Shape}
          alt="shape"
          className="absolute opacity-40 -z-10 left-0 bottom-0 md:block hidden"
        />
        <div className="flex gap-4 items-center">
          <Button
            type="button"
            children="Hakkımızda"
            className="py-4 bg-blue-600 text-white"
          />
          <Button
            type="button"
            children="Hemen Randevu Alın"
            className="py-4 "
          />
        </div>
        <div className="mt-24 flex items-center gap-4">
          <img src={ModalLine} alt="modal" className="lg:block hidden" />
          <img src={Doctor} alt="modal" className="-ml-32 lg:block hidden" />
          <img
            src={DoctorPatient}
            alt="doctor"
            className="lg:w-[270px] lg:h-[290px] w-[400px] h-[400px] rounded-xl object-cover"
          />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Hero;
