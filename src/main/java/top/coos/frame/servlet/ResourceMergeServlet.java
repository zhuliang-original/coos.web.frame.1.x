package top.coos.frame.servlet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.asual.lesscss.LessEngine;

import top.coos.servlet.DefaultServlet;
import top.coos.servlet.annotation.RequestMapping;
import top.coos.tool.array.ArrayHelper;
import top.coos.tool.compressor.CompressorTool;
import top.coos.tool.file.FileTool;
import top.coos.tool.zip.ZipTool;
import top.coos.web.constant.WebConstant;

@WebServlet(urlPatterns = "/resource/coos/merge/*")
public class ResourceMergeServlet extends DefaultServlet {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;

	private static String RESOURCES_FOLDER = null;

	private static String COOS_AND_PLUGINS_RESOURCES_FOLDER = null;

	@Override
	public void init(ServletConfig config) throws ServletException {

		RESOURCES_FOLDER = WebConstant.Path.getWebServerPath(config.getServletContext()) + "/resource/";
		COOS_AND_PLUGINS_RESOURCES_FOLDER = WebConstant.Path.getWebServerPath(config.getServletContext()) + "/resource/";
		super.init(config);
	}

	@RequestMapping("/resource.zip")
	public void resource(HttpServletRequest request, HttpServletResponse response) {

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String plugins_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "plugins/";
		String resource_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "resource/";
		try {

			FileTool.copyDir(COOS_folder + "css", resource_folder + "coos/css", null);
			FileTool.copyDir(COOS_folder + "images", resource_folder + "coos/images", null);
			FileTool.copyDir(COOS_folder + "js", resource_folder + "coos/js", null);

			FileTool.copyDir(plugins_folder, resource_folder + "plugins", null);
			String zipPath = COOS_AND_PLUGINS_RESOURCES_FOLDER + "resource.zip";
			ZipTool zipTool = new ZipTool(zipPath);
			zipTool.compressExe(resource_folder);

			File file = new File(zipPath);
			String fileName = "resource.zip";
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ new String(fileName.getBytes("ISO8859-1"), "UTF-8"));
			response.setContentLength((int) file.length());
			response.setContentType("application/zip");// 定义输出类型
			FileInputStream fis = new FileInputStream(file);
			BufferedInputStream buff = new BufferedInputStream(fis);
			byte[] b = new byte[1024];// 相当于我们的缓存
			long k = 0;// 该值用于计算当前实际下载了多少字节
			OutputStream myout = response.getOutputStream();// 从response对象中得到输出流,准备下载
			// 开始循环下载
			while (k < file.length()) {
				int j = buff.read(b, 0, 1024);
				k += j;
				myout.write(b, 0, j);
			}
			myout.flush();
			buff.close();
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/lessToCSS")
	public void lessToCSS(HttpServletRequest request, HttpServletResponse response) {

		String css_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/css";
		String less_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/less";

		File file = new File(less_folder);
		File[] fs = file.listFiles();
		try {

			if (fs != null) {
				for (File lessFile : fs) {
					File cssFile = new File(css_folder + "/" + (lessFile.getName().replace("less", "css")));

					LessEngine lessEngine = new LessEngine();
					lessEngine.compile(lessFile, cssFile);
				}
			}
			out(response, "生成成功！");
		} catch (Exception e) {
			out(response, "生成失败！\nerror:" + e.getMessage());
		}
	}

	@RequestMapping("/coos.js")
	public void coosJS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("js", false);
		outJS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.min.js")
	public void coosMinJS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("js", true);
		outJS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.min.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.less")
	public void coosLess(HttpServletRequest request, HttpServletResponse response) {

		String content = getLessContent("less");
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "less/coos.less";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}

	}

	@RequestMapping("/coos.css")
	public void coosCSS(HttpServletRequest request, HttpServletResponse response) {

		String content = getCSSContent("css", false);
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.min.css")
	public void coosMinCSS(HttpServletRequest request, HttpServletResponse response) {

		String content = getCSSContent("css", true);
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.min.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.page.js")
	public void coosPageJS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("page/js", false);
		outJS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.page.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.page.min.js")
	public void coosPageMinJS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("page/js", true);
		outJS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.page.min.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.page.less")
	public void coosPageLess(HttpServletRequest request, HttpServletResponse response) {

		String content = getLessContent("page/less");
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "less/coos.page.less";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.page.css")
	public void coosPageCSS(HttpServletRequest request, HttpServletResponse response) {

		String content = getCSSContent("page/css", false);
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.page.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.page.min.css")
	public void coosPageMinCSS(HttpServletRequest request, HttpServletResponse response) {

		String content = getCSSContent("page/css", true);
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.page.min.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.frame.js")
	public void coosFrameJS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("frame/js", false);
		outJS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.frame.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.frame.min.js")
	public void coosFrameMinJS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("frame/js", true);
		outJS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.frame.min.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.frame.less")
	public void coosFrameLess(HttpServletRequest request, HttpServletResponse response) {

		String content = getLessContent("frame/less");
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "less/coos.frame.less";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.frame.css")
	public void coosFrameCSS(HttpServletRequest request, HttpServletResponse response) {

		String content = getCSSContent("frame/css", false);
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.frame.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	@RequestMapping("/coos.frame.min.css")
	public void coosFrameMinCSS(HttpServletRequest request, HttpServletResponse response) {

		String content = getJSContent("frame/css", true);
		outCSS(response, content);

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.frame.min.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
	}

	public String getLessContent(String folder) {

		StringBuffer buffer = new StringBuffer();

		String coosLessFolderPath = RESOURCES_FOLDER + "dist/" + folder;

		appendFolderSubFile(buffer, new File(coosLessFolderPath));

		String content = buffer.toString();
		content = content.replaceAll(";+", ";");
		return content;
	}

	public String getCSSContent(String folder, boolean ismin) {

		StringBuffer buffer = new StringBuffer();

		String coosCSSFolderPath = RESOURCES_FOLDER + "dist/" + folder;

		appendFolderSubFile(buffer, new File(coosCSSFolderPath));

		String content = buffer.toString();
		content = content.replaceAll(";+", ";");
		if (ismin) {
			content = CompressorTool.compressor(buffer.toString(), CompressorTool.Type.CSS);
		}

		return content;
	}

	public String getJSContent(String folder, boolean ismin) {

		StringBuffer buffer;
		if (folder.equals("js")) {
			buffer = new StringBuffer("(function(window, jQuery) {");
		} else {
			buffer = new StringBuffer("(function(window, jQuery, co) {");
		}
		buffer.append("\n");

		String coosJSFolderPath = RESOURCES_FOLDER + "dist/" + folder;

		appendFolderSubFile(buffer, new File(coosJSFolderPath));
		buffer.append("\n");
		if (folder.equals("js")) {
			buffer.append("})(window, jQuery);");
		} else {
			buffer.append("})(window, jQuery, coos);");
		}

		String content = buffer.toString();

		if (ismin) {
			content = CompressorTool.compressor(content, CompressorTool.Type.JS);
		}

		return content;
	}

	public void appendFolderSubFile(StringBuffer buffer, File folderFile) {

		if (folderFile != null && folderFile.isDirectory()) {
			File[] files = folderFile.listFiles();

			String indexPath = folderFile.getAbsolutePath() + "/index.less";
			File indexFile = new File(indexPath);
			if (indexFile != null && indexFile.isFile()) {
				String content = FileTool.read(indexFile);
				buffer.append(content);
				buffer.append("\n");
			}
			indexPath = folderFile.getAbsolutePath() + "/index.css";
			indexFile = new File(indexPath);
			if (indexFile != null && indexFile.isFile()) {
				String content = FileTool.read(indexFile);
				buffer.append(content);
				buffer.append("\n");
			}
			indexPath = folderFile.getAbsolutePath() + "/index.js";
			indexFile = new File(indexPath);
			if (indexFile != null && indexFile.isFile()) {
				String content = FileTool.read(indexFile);
				buffer.append(content);
				buffer.append("\n");
			}

			ArrayHelper.sortACS(files);
			for (File file : files) {
				if (file.isFile() && file.getName().indexOf("index") != 0) {
					buffer.append(FileTool.read(file));
					buffer.append("\n");
				}
			}
			for (File file : files) {
				if (file.isDirectory()) {
					appendFolderSubFile(buffer, file);
				}
			}
		}
	}
}