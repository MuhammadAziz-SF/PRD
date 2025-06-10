import { languageService } from '../services/language.service.js';

class LanguageController {
  async createLanguage(req, res, next) {
    try {
      const languageData = req.body;
      languageData.userId = req.user.id;

      const newLanguage = await languageService.createLanguage(languageData);

      res.status(201).json({
        success: true,
        message: 'Language created successfully',
        data: newLanguage,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLanguageById(req, res, next) {
    try {
      const { id } = req.params;
      const language = await languageService.getLanguageById(id);

      if (!language) {
        return res.status(404).json({
          success: false,
          message: 'Language not found',
        });
      }

      if (language.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this language',
        });
      }

      res.status(200).json({
        success: true,
        data: language,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserLanguages(req, res, next) {
    try {
      const userId = req.params.userId || req.user.id;

      if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to these languages',
        });
      }

      const languages = await languageService.getLanguagesByUserId(userId);

      res.status(200).json({
        success: true,
        count: languages.length,
        data: languages,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLanguage(req, res, next) {
    try {
      const { id } = req.params;
      const languageData = req.body;

      const existingLanguage = await languageService.getLanguageById(id);
      if (!existingLanguage) {
        return res.status(404).json({
          success: false,
          message: 'Language not found',
        });
      }

      if (existingLanguage.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this language',
        });
      }

      const updatedLanguage = await languageService.updateLanguage(id, languageData);

      res.status(200).json({
        success: true,
        message: 'Language updated successfully',
        data: updatedLanguage,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLanguage(req, res, next) {
    try {
      const { id } = req.params;

      const existingLanguage = await languageService.getLanguageById(id);
      if (!existingLanguage) {
        return res.status(404).json({
          success: false,
          message: 'Language not found',
        });
      }

      if (existingLanguage.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this language',
        });
      }

      await languageService.deleteLanguage(id);

      res.status(200).json({
        success: true,
        message: 'Language deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

const Language = new LanguageController();
export default Language;
