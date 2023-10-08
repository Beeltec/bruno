import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import StyledWrapper from './StyledWrapper';
import { usePreferences } from 'providers/Preferences';

const ProxySettings = () => {
  const { preferences, setPreferences } = usePreferences();

  const formik = useFormik({
    initialValues: {
      enabled: preferences.proxy.enabled || false,
      protocol: preferences.proxy.protocol || 'http',
      hostname: preferences.proxy.hostname || '',
      port: preferences.proxy.port || 0,
      auth: {
        enabled: preferences.proxy.auth ? preferences.proxy.auth.enabled || false : false,
        username: preferences.proxy.auth ? preferences.proxy.auth.username || '' : '',
        password: preferences.proxy.auth ? preferences.proxy.auth.password || '' : ''
      },
      noProxy: preferences.proxy.noProxy || ''
    },
    validationSchema: Yup.object({
      enabled: Yup.boolean(),
      protocol: Yup.string().oneOf(['http', 'https', 'socks5']),
      hostname: Yup.string().max(1024),
      port: Yup.number().min(0).max(65535),
      auth: Yup.object({
        enabled: Yup.boolean(),
        username: Yup.string().max(1024),
        password: Yup.string().max(1024)
      }),
      noProxy: Yup.string().max(1024)
    }),
    onSubmit: (values) => {
      onUpdate(values);
    }
  });

  const onUpdate = (values) => {
    const updatedPreferences = {
      ...preferences,
      proxy: values
    };

    setPreferences(updatedPreferences)
      .then(() => {
        toast.success('Proxy settings updated successfully.');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    formik.setValues({
      enabled: preferences.proxy.enabled || false,
      protocol: preferences.proxy.protocol || 'http',
      hostname: preferences.proxy.hostname || '',
      port: preferences.proxy.port || '',
      auth: {
        enabled: preferences.proxy.auth ? preferences.proxy.auth.enabled || false : false,
        username: preferences.proxy.auth ? preferences.proxy.auth.username || '' : '',
        password: preferences.proxy.auth ? preferences.proxy.auth.password || '' : ''
      },
      noProxy: preferences.proxy.noProxy || ''
    });
  }, [preferences]);

  return (
    <StyledWrapper>
      <h1 className="font-medium mb-3">Proxy Settings</h1>
      <form className="bruno-form" onSubmit={formik.handleSubmit}>
        <div className="ml-4 mb-3 flex items-center">
          <label className="settings-label" htmlFor="enabled">
            Enabled
          </label>
          <input type="checkbox" name="enabled" checked={formik.values.enabled} onChange={formik.handleChange} />
        </div>
        <div className="ml-4 mb-3 flex items-center">
          <label className="settings-label" htmlFor="protocol">
            Protocol
          </label>
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="radio"
                name="protocol"
                value="http"
                checked={formik.values.protocol === 'http'}
                onChange={formik.handleChange}
                className="mr-1"
              />
              http
            </label>
            <label className="flex items-center ml-4">
              <input
                type="radio"
                name="protocol"
                value="https"
                checked={formik.values.protocol === 'https'}
                onChange={formik.handleChange}
                className="mr-1"
              />
              https
            </label>
            <label className="flex items-center ml-4">
              <input
                type="radio"
                name="protocol"
                value="socks5"
                checked={formik.values.protocol === 'socks5'}
                onChange={formik.handleChange}
                className="mr-1"
              />
              socks5
            </label>
          </div>
        </div>
        <div className="ml-4 mb-3 flex items-center">
          <label className="settings-label" htmlFor="hostname">
            Hostname
          </label>
          <input
            id="hostname"
            type="text"
            name="hostname"
            className="block textbox"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.hostname || ''}
          />
          {formik.touched.hostname && formik.errors.hostname ? (
            <div className="text-red-500">{formik.errors.hostname}</div>
          ) : null}
        </div>
        <div className="ml-4 mb-3 flex items-center">
          <label className="settings-label" htmlFor="port">
            Port
          </label>
          <input
            id="port"
            type="number"
            name="port"
            className="block textbox"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.port}
          />
          {formik.touched.port && formik.errors.port ? <div className="text-red-500">{formik.errors.port}</div> : null}
        </div>
        <div className="ml-4 mb-3 flex items-center">
          <label className="settings-label" htmlFor="auth.enabled">
            Auth
          </label>
          <input
            type="checkbox"
            name="auth.enabled"
            checked={formik.values.auth.enabled}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <div className="ml-4 mb-3 flex items-center">
            <label className="settings-label" htmlFor="auth.username">
              Username
            </label>
            <input
              id="auth.username"
              type="text"
              name="auth.username"
              className="block textbox"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={formik.values.auth.username}
              onChange={formik.handleChange}
            />
            {formik.touched.auth?.username && formik.errors.auth?.username ? (
              <div className="text-red-500">{formik.errors.auth.username}</div>
            ) : null}
          </div>
          <div className="ml-4 mb-3 flex items-center">
            <label className="settings-label" htmlFor="auth.password">
              Password
            </label>
            <input
              id="auth.password"
              type="text"
              name="auth.password"
              className="block textbox"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={formik.values.auth.password}
              onChange={formik.handleChange}
            />
            {formik.touched.auth?.password && formik.errors.auth?.password ? (
              <div className="text-red-500">{formik.errors.auth.password}</div>
            ) : null}
          </div>
        </div>
        <div className="ml-4 mb-3 flex items-center">
          <label className="settings-label" htmlFor="noProxy">
            Proxy Bypass
          </label>
          <input
            id="noProxy"
            type="text"
            name="noProxy"
            className="block textbox"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={formik.handleChange}
            value={formik.values.noProxy || ''}
          />
          {formik.touched.noProxy && formik.errors.noProxy ? (
            <div className="text-red-500">{formik.errors.noProxy}</div>
          ) : null}
        </div>
        <div className="mt-6">
          <button type="submit" className="submit btn btn-md btn-secondary">
            Save
          </button>
        </div>
      </form>
    </StyledWrapper>
  );
};

export default ProxySettings;
