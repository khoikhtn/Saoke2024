import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

public class PDFReader {
  public static void main(String[] args) {
    String inFile = args[0] + ".pdf";
    String outFile = args[0] + ".csv";

    try {
      FileWriter fileWriter = new FileWriter(outFile, true);
      fileWriter.write("\"date\",\"code\",\"amount\",\"detail\"\n");
      PDDocument document = PDDocument.load(new File(inFile));
      int totalPages = document.getNumberOfPages();
      System.out.println("Total pages: " + totalPages);
      if (!document.isEncrypted()) {
        PDFTextStripper pdfStripper = new PDFTextStripper();
        for (int pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
          pdfStripper.setStartPage(pageIndex);
          pdfStripper.setEndPage(pageIndex);
          String[] lines = pdfStripper.getText(document).split("\n");
          String date = "^\\d{2}/\\d{2}/\\d{4}$";
          String eliminate = "^Page\s+[0-9]+\s+of\s+[0-9]+";
          int column = 0;
          boolean isNew = true;
          boolean isValid = true;
          for (String line : lines) {
            if (line.matches(date)) {
              if (isNew) {
                isNew = false;
                isValid = true;
              } else {
                fileWriter.write("\"\n");
              }
              column = 1;
            } else if (line.matches(eliminate)) {
              isValid = false;
            }

            if (column == 1) {
              String[] tmp = line.split("/");
              fileWriter.write("\"" + tmp[2] + "-" + tmp[1] + "-" + tmp[0] + "\",");
              column++;
            } else if (column == 2) {
              fileWriter.write("\"" + line.replace(".", "") + "\",");
              column++;
            } else if (column == 3) {
              String tmp =
                  line.replaceFirst("\\.", "")
                      .replaceFirst("^\\s+", "")
                      .replaceFirst("\\s+", ",\"")
                      .replaceFirst("\\s+$", "");
              fileWriter.write(tmp.replace(".", ""));
              column++;
            } else if (column >= 4) {
              if (isValid) {
                fileWriter.write(" " + line.replaceFirst("^\\s+", "").replaceFirst("\\s+$", ""));
              }
            }
          }
          fileWriter.write("\"\n");
        }
      }
      document.close();
      fileWriter.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
